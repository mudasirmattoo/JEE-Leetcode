package questions

import (
	"backend/db"
	"backend/models"
	"backend/profile"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
)

func QuestionFormHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid Request Method", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	var question models.Question
	question.Question = r.FormValue("question")
	question.Difficulty = r.FormValue("difficulty")
	question.Subject = r.FormValue("subject")
	marks, err := strconv.ParseFloat(r.FormValue("marks"), 64)
	if err != nil {
		http.Error(w, "Invalid marks value", http.StatusBadRequest)
		return
	}
	question.Marks = marks

	negativeMarks, err := strconv.ParseFloat(r.FormValue("negativeMarks"), 64)
	if err != nil {
		http.Error(w, "Invalid negative marks value", http.StatusBadRequest)
		return
	}
	question.NegativeMarks = negativeMarks

	question.QuestionType = r.FormValue("questionType")
	question.Explanation = r.FormValue("explanation")
	question.Solved = r.FormValue("solved") == "true"

	json.Unmarshal([]byte(r.FormValue("options")), &question.Options)
	json.Unmarshal([]byte(r.FormValue("correctAnswers")), &question.CorrectAnswers)

	file, meta, err := r.FormFile("image") // meta -----> metadata about the image
	if err == nil {
		defer file.Close()
		imagePath := "uploads/" + meta.Filename
		outFile, _ := os.Create(imagePath)
		defer outFile.Close()
		io.Copy(outFile, file)
		question.ImagePath = &imagePath

	}

	result := db.DB.Create(&question)

	if result.Error != nil {
		http.Error(w, "Failed to create the Question", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, `{"message": "Question added successfully"}`)
}

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
		http.Error(w, "Not solved by you", http.StatusNotFound)
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
				marks = marks - question.NegativeMarks
			}
		} else if question.QuestionType == "integer" {
			// frontend sai jo integer value aayegi usko yahan compare karne ka pehle
			marks = question.Marks
		} else {
			if numOfIncorrect == 0 {
				marks = float64(numOfCorrect)
			} else {
				marks = marks - float64(question.NegativeMarks)
			}
		}
	}

	response := map[string]interface{}{
		"correct_answers":   correct,
		"incorrect_answers": incorrectOptions,
		"marks_scored":      marks,
	}

	w.Header().Set("Content-Type", "appication/json")
	json.NewEncoder(w).Encode(response)
}

func SubmitHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
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
