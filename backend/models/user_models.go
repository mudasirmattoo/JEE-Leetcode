package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// type User struct {
// 	gorm.Model
// 	Username  string  `gorm:"unique;not null" json:"username"`
// 	Email     string  `gorm:"unique;not null" json:"email"`
// 	Password  string  `json:"-"`
// 	GoogleID  string  `gorm:"unique"`
// 	Institute string  `gorm:"size:255" json:"institute"`
// 	ImagePath *string `gorm:"type:text;default:null"`
// 	Solved    int     `gorm:"default:0"`
// 	Role      string  `gorm:"default:null" json:"role"`
// }

type Profile struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey"`
	Username     string    `gorm:"unique;not null"`
	Email        string    `gorm:"unique"`
	Institute    string    `gorm:"size:255"`
	ImagePath    *string   `gorm:"type:text"`
	Solved       int       `gorm:"default:0"`
	SolvedCount  int       `gorm:"default:0"`
	Role         string    `gorm:"default:'user'"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	CreatedTests []Test `gorm:"foreignKey:CreatedByUserID"`
}

type UserStats struct {
	gorm.Model
	User           Profile `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	UserID         uuid.UUID
	Accuracy       float64
	AvgTime        float64
	Rank           *int `gorm:"default:null"`
	TotalTimeSpent time.Duration
	SolvedPerDay   *int `gorm:"default:0"`
	LastSolved     time.Time
}
type PasswordReset struct {
	gorm.Model
	UserID    uuid.UUID `gorm:"not null"`
	User      Profile   `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Token     string    `gorm:"unique;not null"`
	ExpiresAt time.Time `gorm:"not null"`
}
