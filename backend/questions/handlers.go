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

func OptionsAndCorrectHandler(r *http.Request) ([]string, []string) {
	var question models.Question

	err := db.DB.First(&question, question.ID)
	if err != nil {
		return nil, nil
	}

	var options []string
	var correct []string
	json.Unmarshal(question.Options, &options)
	json.Unmarshal(question.CorrectAnswers, &correct)

	return options, correct
}

func CorrectAnswerHandler(w http.ResponseWriter, r *http.Request) {

	var question models.Question
	solved, err := profile.QuestionIsSolved(db.DB, question.ID, question.UserID)
	if err != nil {
		return
	}

	options, correct := OptionsAndCorrectHandler(r)
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

	numOfCorrect := len(correct)
	numOfIncorrect := len(incorrectOptions)

	marks := 0.0
	if solved {
		if question.QuestionType == "single" {
			if numOfIncorrect == 0 {
				marks = question.Marks
			} else {
				marks = question.NegativeMarks
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
}
