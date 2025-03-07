package questions

import (
	"backend/db"
	"backend/models"
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
