package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique;not null" json:"username"`
	Email    string `gorm:"unique;not null" json:"email"`
	Password string `json:"-"`
	GoogleID string `gorm:"unique"`

	Institute    string  `gorm:"size:255" json:"institute"`
	ImagePath    *string `gorm:"type:text;default:null"`
	Rank         *int    `gorm:"unique;default:null" json:"rank"`
	Solved       int     `gorm:"default:0"`
	SolvedPerDay *int    `gorm:"default:null"`
	Role         string  `gorm:"default:null" json:"role"`
}

type PasswordReset struct {
	gorm.Model
	UserID    uint      `gorm:"not null"`
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Token     string    `gorm:"unique;not null"`
	ExpiresAt time.Time `gorm:"not null"`
}
