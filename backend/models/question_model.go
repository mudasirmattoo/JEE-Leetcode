package models

import (
	"time"
)

type Question struct {
	Question       string   `gorm:"size:500;not null"`
	Difficulty     string   `gorm:"size:50;not null"`
	Subject        string   `gorm:"size:100;not null"`
	Topic          string   `gorm:"size:100;not null"`
	Marks          float64  `gorm:"not null"`
	NegativeMarks  float64  `gorm:"default:0"`
	IntegerAnswer  float64  `gorm:"default:0"`
	QuestionType   string   `gorm:"size:50;not null"`
	Options        []byte   `gorm:"type:jsonb"`
	CorrectAnswers []byte   `gorm:"type:jsonb"`
	Explanation    string   `gorm:"type:text"`
	ImagePath      *string  `gorm:"type:text;default:null"`
	Comments       []string `gorm:"-"`
}

type UserQuestionAttempt struct {
	ID              uint
	UserID          uint
	User            User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	QuestionID      uint
	SelectedOptions []byte `gorm:"type:jsonb"`
	IsCorrect       bool
	SolvedAt        time.Time
	Solved          bool `gorm:"not null"`
}
