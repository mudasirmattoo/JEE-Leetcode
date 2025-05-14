package db

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

func CreateUsers(username, email, password string) error {
	if DB == nil {
		return fmt.Errorf("database is not connected")
	}

	user := models.Profile{
		Username: username,
		Email:    email,
		// Password: password,
	}

	result := DB.Create(&user)

	return result.Error
}

func QuestionFormHandler(w http.ResponseWriter, r *http.Request) {
	if DB == nil {
		http.Error(w, "Database is not connected", http.StatusInternalServerError)
		return
	}

	var question models.Question
	question.Question = r.FormValue("question")
	question.Difficulty = r.FormValue("difficulty")
	question.Subject = r.FormValue("subject")
	question.Topic = r.FormValue("topic")
	// question.Marks = marks
	// question.NegativeMarks = negativeMarks
	// question.QuestionType = r.FormValue("questionType")
	question.Explanation = r.FormValue("explanation")
	optionsJSON := r.FormValue("options")
	correctAnswersJSON := r.FormValue("correctAnswers")
	if optionsJSON == "" || correctAnswersJSON == "" {
		http.Error(w, "Missing options or correctAnswers", http.StatusBadRequest)
		return
	}
	if !json.Valid([]byte(optionsJSON)) {
		http.Error(w, "Invalid JSON format for options", http.StatusBadRequest)
		return
	}
	if !json.Valid([]byte(correctAnswersJSON)) {
		http.Error(w, "Invalid JSON format for correctAnswers", http.StatusBadRequest)
		return
	}

	question.Options = []byte(optionsJSON)
	question.CorrectAnswers = []byte(correctAnswersJSON)

	supabaseImageName := r.FormValue("imageName")
	question.ImagePath = nil

	if supabaseImageName != "" {
		projectRef := os.Getenv("SUPABASE_PROJECT_REF")
		bucket := os.Getenv("SUPABASE_STORAGE_BUCKET")
		if projectRef == "" || bucket == "" {
			log.Println("bhai env load kar pehle")
		} else {
			publicURL := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/public/%s/%s",
				projectRef,
				bucket,
				supabaseImageName)

			urlSlice := []string{publicURL}

			imageBytes, err := json.Marshal(urlSlice)
			if err != nil {
				log.Printf("Error marshaling image path URL for question form: %v", err)
				http.Error(w, "Failed to process image path", http.StatusInternalServerError)
				return
			}
			question.ImagePath = imageBytes
		}
	}

	result := DB.Create(&question)
	if result.Error != nil {
		log.Printf("Error creating question from form: %v", result.Error)
		http.Error(w, "Failed to create the Question", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
