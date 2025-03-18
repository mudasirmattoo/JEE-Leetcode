package auth

import (
	"backend/db"
	"backend/models"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"time"
)

func PasswordResetRequest(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Email string `json:"email"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	var user models.User

	err = db.DB.Where("email = ?", request.Email).First(&user).Error
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	randomtoken := make([]byte, 32)
	_, er := rand.Read(randomtoken)
	if er != nil {
		http.Error(w, "Bhai token generate nahi hua", http.StatusInternalServerError)
		return
	}

	token := hex.EncodeToString(randomtoken)

	reset := models.PasswordReset{
		UserID:    user.ID,
		Token:     token,
		ExpiresAt: time.Now().Add(5 * time.Minute),
	}
	db.DB.Create(&reset)

	resetLink := fmt.Sprintf("http://localhost:3000/reset-password?token=%s", token)
	sendEmail(user.Email, resetLink)
	json.NewEncoder(w).Encode(map[string]string{"message": "Password link aagayi hai aapke mail pai"})
}

func sendEmail(receiver string, resetLink string) {
	from := os.Getenv("SMTP_EMAIL")
	password := os.Getenv("SMTP_PASSWORD")
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	message := []byte("Subject: Password Reset\n\nClick the link below to reset your password:\n" + resetLink)
	auth := smtp.PlainAuth("", from, password, smtpHost)
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{receiver}, message)
	if err != nil {
		fmt.Println("Failed to send email:", err)
	}
}
