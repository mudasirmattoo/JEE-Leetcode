package questions

import (
	"backend/db"
	"backend/models"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
)

func SubmitHandler(w http.ResponseWriter, r *http.Request) {
	if db.DB == nil {
		http.Error(w, "Database is not connected", http.StatusInternalServerError)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		UserID          string   `json:"user_id"`
		QuestionID      uint     `json:"question_id"`
		SelectedOptions []string `json:"selected_options"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	userID_uuid, err := uuid.Parse(requestData.UserID)
	if err != nil {
		http.Error(w, "Invalid user_id format. Must be a valid UUID.", http.StatusBadRequest)
		return
	}

	if requestData.QuestionID == 0 {
		http.Error(w, "Missing question_id", http.StatusBadRequest)
		return
	}

	var question models.Question
	if err := db.DB.First(&question, requestData.QuestionID).Error; err != nil {
		log.Printf("Error fetching question %d in SubmitHandler: %v", requestData.QuestionID, err)
		http.Error(w, "Question not found", http.StatusNotFound)
		return
	}

	marksScored, isCorrect, err := CalculateScore(question, requestData.SelectedOptions)
	if err != nil {
		log.Println("error processing marks and correctness")
		return
	}

	selectedOptionsBytes, err := json.Marshal(requestData.SelectedOptions)
	if err != nil {
		log.Printf("Error marshaling selected options for user %d, question %d: %v", requestData.UserID, requestData.QuestionID, err)
		http.Error(w, "Failed to process submission", http.StatusInternalServerError)
		return
	}

	attempt := models.UserQuestionAttempt{
		UserID:          userID_uuid,
		QuestionID:      requestData.QuestionID,
		SelectedOptions: selectedOptionsBytes,
		IsCorrect:       isCorrect,
		SolvedAt:        time.Now(),
		Solved:          true,
	}

	result := db.DB.Create(&attempt)
	if result.Error != nil {
		log.Println("Error saving user attempt ")
		http.Error(w, "Failed to save submission", http.StatusInternalServerError)
		return
	}
	log.Printf("Saved attempt ID %d for User %d, QID %d. Correct: %t, Score: %f", attempt.ID, attempt.UserID, attempt.QuestionID, attempt.IsCorrect, marksScored)

	response := map[string]interface{}{
		"success":      true,
		"message":      "Submission received",
		"is_correct":   isCorrect,
		"marks_scored": marksScored,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Println("issue in encoding submit handler")
	}
}
