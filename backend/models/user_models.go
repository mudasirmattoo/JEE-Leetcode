package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string  `gorm:"unique;not null" json:"username"`
	Email     string  `gorm:"unique;not null" json:"email"`
	Password  string  `json:"-"`
	GoogleID  string  `gorm:"unique"`
	Institute string  `gorm:"size:255" json:"institute"`
	ImagePath *string `gorm:"type:text;default:null"`
	Solved    int     `gorm:"default:0"`
	Role      string  `gorm:"default:null" json:"role"`
}

type UserStats struct {
	gorm.Model
	User           User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	UserID         uint
	Accuracy       float64
	AvgTime        float64
	Rank           *int `gorm:"default:null"`
	TotalTimeSpent time.Duration
	SolvedPerDay   *int `gorm:"default:0"`
	LastSolved     time.Time
}
type PasswordReset struct {
	gorm.Model
	UserID    uint      `gorm:"not null"`
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Token     string    `gorm:"unique;not null"`
	ExpiresAt time.Time `gorm:"not null"`
}
