package questions

import (
	"backend/db"
	"backend/models"
	"encoding/json"
	"fmt"
	"log"
)

type OptionDetail struct {
	ID   string `json:"id"`
	Text string `json:"text"`
}

func FetchQuestionDetails(questionID uint) (optionIDs []string, correctAnswers []string, fetchedQuestion *models.Question, err error) {
	var question models.Question

	dbErr := db.DB.First(&question, questionID).Error
	if dbErr != nil {
		err = fmt.Errorf("question with ID %d not found: %w", questionID, dbErr)
		return
	}

	var optionsData []OptionDetail
	if question.Options != nil && len(question.Options) > 2 {
		if unmarshalErr := json.Unmarshal(question.Options, &optionsData); unmarshalErr != nil {
			log.Printf("Error unmarshaling Options for question %d: %v", questionID, unmarshalErr)
			err = fmt.Errorf("failed to parse options data for question %d: %w", questionID, unmarshalErr)
			return
		}
	} else {
		optionsData = []OptionDetail{}
	}

	optionIDs = make([]string, len(optionsData))
	for i, opt := range optionsData {
		optionIDs[i] = opt.ID
	}

	correctAnswers = []string{}
	if question.CorrectAnswers != nil && len(question.CorrectAnswers) > 2 {
		if unmarshalErr := json.Unmarshal(question.CorrectAnswers, &correctAnswers); unmarshalErr != nil {
			log.Printf("Error unmarshaling CorrectAnswers for question %d: %v", questionID, unmarshalErr)
			err = fmt.Errorf("failed to parse correct answers data for question %d: %w", questionID, unmarshalErr)
		}
	}

	fetchedQuestion = &question
	return
}
