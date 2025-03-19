package questions

import (
	"backend/db"
	"backend/models"
	"backend/profile"
	"encoding/json"
	"net/http"
	"strconv"
)

func OptionsAndCorrectHandler(questionID uint) ([]string, []string, error) {
	var question models.Question

	err := db.DB.First(&question, questionID).Error
	if err != nil {
		return nil, nil, err
	}

	var options []string
	var correct []string
	json.Unmarshal(question.Options, &options)
	json.Unmarshal(question.CorrectAnswers, &correct)

	return options, correct, nil
}

func CorrectAnswerHandler(w http.ResponseWriter, r *http.Request) {

	queryParameters := r.URL.Query()
	questionID, err := strconv.ParseUint(queryParameters.Get("questionID"), 10, 32)
	if err != nil {
		http.Error(w, "Invalid question ID", http.StatusBadRequest)
		return
	}

	userID, err := strconv.ParseUint(queryParameters.Get("userID"), 10, 32)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	solved, err := profile.QuestionIsSolved(db.DB, uint(questionID), uint(userID))
	if err != nil {
		http.Error(w, "Bhai Aapne solve nahi kiya hai", http.StatusNotFound)
		return
	}

	options, correct, err := OptionsAndCorrectHandler(uint(questionID))
	if err != nil {
		http.Error(w, "Question not found", http.StatusNotFound)
		return
	}

	correctOptions := make(map[string]struct{})
	for _, ans := range correct {
		correctOptions[ans] = struct{}{}
	}

	var incorrectOptions []string
	for _, v := range options {
		if _, found := correctOptions[v]; !found {
			incorrectOptions = append(incorrectOptions, v)
		}
	}

	var question models.Question
	err = db.DB.First(&question, uint(questionID)).Error
	if err != nil {
		http.Error(w, "Question details not found", http.StatusInternalServerError)
		return
	}

	marks := 0.0
	if solved {
		numOfCorrect := len(correct)
		numOfIncorrect := len(incorrectOptions)

		if question.QuestionType == "single" {
			if numOfIncorrect == 0 {
				marks = question.Marks
			} else {
				marks -= question.NegativeMarks
			}
		} else if question.QuestionType == "integer" {
			// frontend sai jo integer value aayegi usko yahan compare karne ka pehle
			marks = question.Marks
		} else {
			if numOfIncorrect == 0 {
				marks = float64(numOfCorrect)
			} else {
				marks -= float64(question.NegativeMarks)
			}
		}
	}

	response := map[string]interface{}{
		"correct_answers":   correct,
		"incorrect_answers": incorrectOptions,
		"marks_scored":      marks,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func SubmitHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		QuestionID      uint     `json:"question_id"`
		SelectedOptions []string `json:"selected_options"`
	}

	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	var question models.Question

	err = db.DB.First(&question, requestData.QuestionID).Error
	if err != nil {
		http.Error(w, "Question not found", http.StatusNotFound)
		return
	}

	selectedOptionsKiJson, err := json.Marshal(requestData.SelectedOptions)
	if err != nil {
		http.Error(w, "Failed to encode selected options into json", http.StatusInternalServerError)
		return
	}

	question.SelectedOptions = selectedOptionsKiJson
	if err := db.DB.Save(&question).Error; err != nil {
		http.Error(w, "Save nahi hua", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":          true,
		"selected_options": requestData.SelectedOptions,
	})
}
