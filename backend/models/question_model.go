package models

import (
	"time"

	"github.com/google/uuid"
)

type Question struct {
	Question         string          `gorm:"size:1000;not null"`
	Difficulty       string          `gorm:"size:50;default:null"`
	Subject          string          `gorm:"size:100;default:null"`
	Topic            string          `gorm:"size:100;default:null"`
	Marks            float64         `gorm:"not null"`
	NegativeMarks    float64         `gorm:"default:0"`
	IntegerAnswer    float64         `gorm:"default:0"`
	QuestionType     string          `gorm:"size:50;default:null"`
	Options          []byte          `gorm:"type:jsonb"`
	OptionImagePaths []byte          `gorm:"type:jsonb;default:null"`
	CorrectAnswers   []byte          `gorm:"type:jsonb"`
	Explanation      string          `gorm:"type:text"`
	ImagePath        []byte          `gorm:"type:jsonb;default:null"`
	Comments         []string        `gorm:"-"`
	Tags             []byte          `gorm:"type:jsonb;default:null"`
	ComprehensionID  *uint           `gorm:"default:null"`
	TestQuestions    []TestQuestions `gorm:"foreignKey:QuestionID"`
}

type UserQuestionAttempt struct {
	ID              uint      `gorm:"primaryKey"`
	User            Profile   `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	UserID          uuid.UUID `gorm:"type:uuid;not null"`
	QuestionID      uint
	SelectedOptions []byte `gorm:"type:jsonb"`
	IsCorrect       bool
	SolvedAt        time.Time
	Solved          bool `gorm:"not null"`
}

type Comprehension struct {
	ID        uint    `gorm:"primaryKey"`
	Title     string  `gorm:"size:255;default:null"`
	Passage   string  `gorm:"type:text;not null"`
	ImagePath *string `gorm:"type:text;default:null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Questions []Question `gorm:"foreignKey:ComprehensionID"`
}
