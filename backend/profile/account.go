package profile

import (
	"backend/db"
	"backend/models"
	"encoding/json"
	"net/http"
)

type UserAccountResponse struct {
	Username  string  `json:"username"`
	Email     string  `json:"email"`
	Institute string  `json:"institute,omitempty"`
	ImagePath *string `gorm:"type:text;default:null"`
}

func AccountHandler(w http.ResponseWriter, r *http.Request) {
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

	accountResponse := UserAccountResponse{
		Username:  user.Username,
		Email:     user.Email,
		Institute: user.Institute,
		ImagePath: user.ImagePath,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accountResponse)

}
