package db

import (
	"backend/models"
	"fmt"
	"log"
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
