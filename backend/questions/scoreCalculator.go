package questions

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"strconv"
)

func CalculateScore(question models.Question, selectedOptions []string) (float64, bool, error) {
	var score float64 = 0.0
	var isCorrect bool = false
	var correctAnswers []string

	if question.CorrectAnswers != nil && len(question.CorrectAnswers) > 2 {
		if err := json.Unmarshal(question.CorrectAnswers, &correctAnswers); err != nil {
			log.Println("failed unmarshalling correctnswers")
			return 0.0, false, fmt.Errorf("internal error processing correct answers: %w", err)
		}
	}

	qType := question.QuestionType
	if qType == "" {
		log.Println("question type unknown")
		qType = "UNKNOWN"
	}

	selectedSet := make(map[string]struct{})
	for _, opt := range selectedOptions {
		selectedSet[opt] = struct{}{}
	}
	correctSet := make(map[string]struct{})
	for _, ans := range correctAnswers {
		correctSet[ans] = struct{}{}
	}

	switch qType {
	case "INTEGER", "NUMERIC":
		if len(selectedOptions) == 1 {
			submittedAnswerStr := selectedOptions[0]
			submittedAnswerFloat, err := strconv.ParseFloat(submittedAnswerStr, 64)
			if err != nil {
				log.Println("parsing submitted int ans failed")
				isCorrect = false
				score = question.NegativeMarks
			} else {
				epsilon := 1e-9
				if math.Abs(submittedAnswerFloat-question.IntegerAnswer) < epsilon {
					isCorrect = true
					score = question.Marks
				} else {
					isCorrect = false
					score = question.NegativeMarks
				}
			}
		} else {
			isCorrect = false
			score = question.NegativeMarks
		}

	case "MCQ", "MULTIPLE_CORRECT", "SINGLE_CORRECT":
		correctSelectedCount := 0
		incorrectSelectedCount := 0
		totalCorrectOptions := len(correctSet)

		if len(selectedSet) == 0 {
			isCorrect = (totalCorrectOptions == 0)
			score = 0.0
			break
		}

		for selectedOpt := range selectedSet {
			if _, found := correctSet[selectedOpt]; found {
				correctSelectedCount++
			} else {
				incorrectSelectedCount++
			}
		}

		if incorrectSelectedCount > 0 {
			isCorrect = false
			score = question.NegativeMarks
		} else if correctSelectedCount == totalCorrectOptions {
			isCorrect = true
			score = question.Marks
		} else if correctSelectedCount > 0 {
			isCorrect = false
			if totalCorrectOptions > 0 {
				score = question.Marks * (float64(correctSelectedCount) / float64(totalCorrectOptions))
			} else {
				score = 0.0
			}
			log.Println("partial score debugging failed")
		} else {
			isCorrect = false
			score = 0.0
		}

	default:
		log.Println("unknown question type")
		isCorrect = false
		score = 0.0

	}

	return score, isCorrect, nil
}
