package db

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

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

	if os.Getenv("DB_HOST") == "" || os.Getenv("DB_PORT") == "" || os.Getenv("DB_USER") == "" || os.Getenv("DB_PASSWORD") == "" || os.Getenv("DB_NAME") == "" || os.Getenv("DB_SSLMODE") == "" {
		log.Fatal("Database configuration error: One or more environment variables (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSLMODE) are missing.")
	}

	var er error
	db, er := gorm.Open(postgres.Open(dsn), &gorm.Config{
		PrepareStmt: false,
	})
	if er != nil {
		log.Fatal("Failed to connect to database:", er)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Printf("Warning: Failed to get underlying sql.DB for pool settings: %v", err)
	} else {
		sqlDB.SetMaxIdleConns(5)
		sqlDB.SetMaxOpenConns(20)
		sqlDB.SetConnMaxLifetime(time.Hour)
		fmt.Println("Database connection pool configured.")
	}

	DB = db
	fmt.Println("Running database auto-migrations...")
	err = DB.AutoMigrate(
		&models.User{},
		&models.UserStats{},
		&models.UserQuestionAttempt{},
		&models.Question{},
		&models.Comprehension{},
		&models.PasswordReset{},
	)
	if err != nil {
		log.Printf("Warning: Failed during auto-migration: %v", err)
	} else {
		fmt.Println("Database auto-migrations completed successfully.")
	}

}

func CreateUsers(username, email, password string) error {
	if DB == nil {
		return fmt.Errorf("database is not connected")
	}

	user := models.User{
		Username: username,
		Email:    email,
		Password: password,
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
