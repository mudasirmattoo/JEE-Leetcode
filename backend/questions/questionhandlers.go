package questions

import (
	"backend/db"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

func CorrectAnswerHandler(w http.ResponseWriter, r *http.Request) {
	if db.DB == nil {
		http.Error(w, "Database is not connected", http.StatusInternalServerError)
		return
	}

	queryParameters := r.URL.Query()
	questionIDStr := queryParameters.Get("questionID")
	userIDStr := queryParameters.Get("userID")

	questionID, err := strconv.ParseUint(questionIDStr, 10, 32)
	if err != nil {
		http.Error(w, "Invalid question ID format", http.StatusBadRequest)
		return
	}

	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		http.Error(w, "Invalid user ID format", http.StatusBadRequest)
		return
	}

	solved, err := QuestionIsSolved(db.DB, uint(questionID), uint(userID))
	if err != nil {
		log.Printf("Error checking if question %d was solved by user %d: %v", questionID, userID, err)
		http.Error(w, "Error checking question status", http.StatusInternalServerError)
		return
	}
	if !solved {
		http.Error(w, "Bhai solve nahi kiya hai tunai", http.StatusForbidden) // Changed message
		return
	}

	optionIDs, correctAnswers, question, err := FetchQuestionDetails(uint(questionID))
	if err != nil || question == nil {
		log.Printf("Error fetching details for question %d: %v", questionID, err)
		http.Error(w, "Could not retrieve question details", http.StatusNotFound)
		return
	}

	correctSet := make(map[string]struct{})
	for _, ansID := range correctAnswers {
		correctSet[ansID] = struct{}{}
	}

	var incorrectOptionIDs []string
	for _, optID := range optionIDs {
		if _, found := correctSet[optID]; !found {
			incorrectOptionIDs = append(incorrectOptionIDs, optID)
		}
	}

	qType := question.QuestionType
	if qType == "" {
		qType = "UNKNOWN"
	}
	log.Printf("DEBUG: CorrectAnswerHandler: Question %d type: %s", questionID, qType)

	response := map[string]interface{}{
		"question_id":       questionID,
		"all_option_ids":    optionIDs,
		"correct_answers":   correctAnswers,
		"incorrect_options": incorrectOptionIDs,
		"explanation":       question.Explanation,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Error encoding CorrectAnswerHandler response: %v", err)
	}
}
