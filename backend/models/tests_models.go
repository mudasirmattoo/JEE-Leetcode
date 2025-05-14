package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Test struct {
	ID              uint       `gorm:"primaryKey;autoIncrement"`
	Title           string     `gorm:"type:text;not null"`
	Description     *string    `gorm:"type:text"`
	CreatedBy       *Profile   `gorm:"constraint:OnDelete:SET NULL"`
	CreatedByUserID *uuid.UUID `gorm:"type:uuid;foreignKey:CreatedBy;references:ID"`
	DurationMinutes *int       `gorm:"type:integer"`
	IsPublic        bool       `gorm:"default:false"`
	Status          string     `gorm:"default:draft"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
	//tables ko kaise join karte hai      ---- one-to-many --> slices ka concept   1 test  ---> many qns
	TestQuestions []TestQuestions `gorm:"foreignKey:TestID;constraint:OnDelete:CASCADE"`
}

type TestQuestions struct {
	ID         uint     `gorm:"primaryKey;autoIncrement"`
	Test       Test     `gorm:"foreignKey:TestID;constraint:OnDelete:CASCADE"`
	TestID     uint     `gorm:"not null"`
	Question   Question `gorm:"foreignKey:QuestionID;constraint:OnDelete:CASCADE"`
	QuestionID uint     `gorm:"not null"`
	gorm.Model
}
