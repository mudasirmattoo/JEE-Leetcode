package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string  `gorm:"unique;not null" json:"username"`
	Email     string  `gorm:"unique;not null" json:"email"`
	Password  string  `json:"password"`
	Institute string  `gorm:"size:255"`
	ImagePath *string `gorm:"type:text;default:null"`
	Rank      *int    `gorm:"unique;default:null"`
	Solved    int     `gorm:"default:0"`
}
