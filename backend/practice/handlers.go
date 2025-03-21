package practice

import (
	"backend/db"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"
)

func PracticeHandler(w http.ResponseWriter, r *http.Request) {
	queryParameters := r.URL.Query()

	numOfQuestions, err := strconv.Atoi(queryParameters.Get("count"))
	difficulty := queryParameters.Get("difficulty")

	if err != nil || numOfQuestions <= 0 {
		numOfQuestions = 5
	}

	var questions []models.Question

	query := db.DB
	if difficulty != "" {
		query = query.Where("difficulty = ?", difficulty)
	}

	err = query.Order("RANDOM()").Limit(numOfQuestions).Find(&questions).Error
	if err != nil {
		http.Error(w, "Question load nahi hua bhai", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(questions)
}
