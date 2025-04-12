package db

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("error loading env ", err)
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
	)

	var er error
	db, er := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if er != nil {
		log.Fatal("Failed to connect to database:", er)
	}

	DB = db
	fmt.Println("connected to PostgreSQL ")

	DB.AutoMigrate(&models.User{}, &models.UserStats{}, &models.UserQuestionAttempt{}, &models.Question{}, &models.PasswordReset{})

}

func CreateUsers(username, email, password string) error {
	user := models.User{
		Username: username,
		Email:    email,
		Password: password,
	}

	result := DB.Create(&user)

	return result.Error
}

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
	var attempt models.UserQuestionAttempt
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
	attempt.Solved = r.FormValue("solved") == "true"

	optionsJSON := r.FormValue("options")
	correctAnswersJSON := r.FormValue("correctAnswers")

	if !json.Valid([]byte(optionsJSON)) || !json.Valid([]byte(correctAnswersJSON)) {
		http.Error(w, "Invalid JSON format for options or correctAnswers", http.StatusBadRequest)
		return
	}

	question.Options = []byte(optionsJSON)
	question.CorrectAnswers = []byte(correctAnswersJSON)

	file, meta, err := r.FormFile("image")
	if err == nil {
		defer file.Close()
		imagePath := "uploads/" + meta.Filename
		outFile, _ := os.Create(imagePath)
		defer outFile.Close()
		io.Copy(outFile, file)
		question.ImagePath = &imagePath
	}

	result := DB.Create(&question)
	if result.Error != nil {
		http.Error(w, "Failed to create the Question", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, `{"message": "Question added successfully"}`)
}
