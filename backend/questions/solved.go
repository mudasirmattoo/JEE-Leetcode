package questions

import (
	"backend/models"
	"time"

	"gorm.io/gorm"
)

func QuestionIsSolved(db *gorm.DB, questionID uint, userID uint) (bool, error) {
	var question models.Question
	var attempt models.QuestionAttempt

	err := db.First(&question, "id = ? AND user_id = ?", questionID, userID).Error
	if err != nil {
		return false, err
	}

	attempt.Solved = true
	attempt.SolvedAt = time.Now()

	err = db.Save(&question).Error
	if err != nil {
		return false, err
	}

	return true, nil
}
