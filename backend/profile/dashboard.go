package profile

import (
	"backend/db"
	"backend/models"
	"encoding/json"
	"net/http"
	"time"

	"gorm.io/gorm"
)

type DashboardResponse struct {
	Username     string  `json:"username"`
	Email        string  `json:"email"`
	Institute    string  `json:"institute,omitempty"`
	ImagePath    *string `gorm:"type:text;default:null"`
	Rank         *int    `gorm:"unique;default:null"`
	Solved       int     `gorm:"default:0"`
	SolvedPerDay *int    `gorm:"default:0"`
}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var user models.User
	var stats models.UserStats

	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username required", http.StatusBadRequest)
		return
	}

	err := db.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	dashboardRespone := DashboardResponse{
		Username:     user.Username,
		Email:        user.Email,
		Institute:    user.Institute,
		ImagePath:    user.ImagePath,
		Rank:         stats.Rank,
		Solved:       user.Solved,
		SolvedPerDay: stats.SolvedPerDay,
	}

	w.Header().Set("Content-Type", "appication/json")
	json.NewEncoder(w).Encode(dashboardRespone)
}

func QuestionIsSolved(db *gorm.DB, questionID uint, userID uint) (bool, error) {
	var question models.Question
	var attempt models.UserQuestionAttempt

	err := db.First(&question, "id = ? AND user_id = ?", questionID, userID).Error
	if err != nil {
		return false, err
	}

	attempt.Solved = true
	attempt.SolvedAt = time.Now()

	err = db.Save(&question).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

func CalculateSolvedPerDay(db *gorm.DB, userID uint) (map[string]int, int, error) {

	type Response struct {
		Date   string
		UserID uint
		Count  int
	}

	var results []Response

	SolvedPerDay := make(map[string]int)

	err := db.Model(&models.Question{}).Select("DATE(solved_at) as date, user_id, COUNT(*) as count").Where("user_id AND solved = ?", userID, true).
		Group("DATE(solved_at)").Order("DATE(solved_at) ASC").Scan(&results).Error
	if err != nil {
		return nil, 0, err
	}

	TotalSolved := 0
	for _, r := range results {
		key := string(r.UserID) + ":" + r.Date
		SolvedPerDay[key] = r.Count
		TotalSolved = TotalSolved + r.Count
	}

	return SolvedPerDay, TotalSolved, nil
}
