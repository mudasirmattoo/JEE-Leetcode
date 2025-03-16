package profile

import (
	"backend/db"
	"backend/models"
	"encoding/json"
	"net/http"
)

type DashboardResponse struct {
	Username  string  `json:"username"`
	Email     string  `json:"email"`
	Institute string  `json:"institute,omitempty"`
	ImagePath *string `gorm:"type:text;default:null"`
	Rank      *int    `gorm:"unique;default:null"`
	Solved    int     `gorm:"default:0"`
}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var user models.User
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

	dashboardrRespone := DashboardResponse{
		Username:  user.Username,
		Email:     user.Email,
		Institute: user.Institute,
		ImagePath: user.ImagePath,
		Rank:      user.Rank,
		Solved:    user.Solved,
	}

	w.Header().Set("Content-Type", "appication/json")
	json.NewEncoder(w).Encode(dashboardrRespone)
}
