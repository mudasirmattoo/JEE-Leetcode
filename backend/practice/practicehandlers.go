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
	timeLimit := queryParameters.Get("time_limit")

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
		http.Error(w, "Questions load nahi huve bhai", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"questions":  questions,
		"time-limit": timeLimit,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
