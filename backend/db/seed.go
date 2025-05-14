package db

// import (
// 	"backend/models"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"os"
// 	"path/filepath"
// 	"strings"
// )

// type OptionDetail struct {
// 	ID   string `json:"id"`
// 	Text string `json:"text"`
// }
// type JSONQuestion struct {
// 	Question         string         `json:"Question"`
// 	Difficulty       string         `json:"Difficulty"`
// 	Subject          string         `json:"Subject"`
// 	Topic            string         `json:"Topic"`
// 	Marks            float64        `json:"Marks"`
// 	NegativeMarks    float64        `json:"NegativeMarks"`
// 	IntegerAnswer    float64        `json:"IntegerAnswer"`
// 	QuestionType     string         `json:"QuestionType"`
// 	Options          []OptionDetail `json:"Options"`
// 	CorrectAnswers   []string       `json:"CorrectAnswers"`
// 	Explanation      *string        `json:"Explaination"`
// 	ImagePath        interface{}    `json:"ImagePath"`
// 	Comments         []string       `json:"Comments"`
// 	Tag              []string       `json:"Tag"`
// 	OptionImagePaths interface{}    `json:"OptionImagePaths"`
// 	ComprehensionID  *uint          `json:"ComprehensionID,omitempty"`
// }

// func InsertQuestionsFromJSON(filePath string) error {
// 	jsonData, err := os.ReadFile(filePath)
// 	if err != nil {
// 		return fmt.Errorf("failed to read JSON file '%s': %w", filePath, err)
// 	}

// 	var questionsFromJSON []JSONQuestion
// 	err = json.Unmarshal(jsonData, &questionsFromJSON)
// 	if err != nil {
// 		return fmt.Errorf("unmarshal fail hua %s : %w", filePath, err)
// 	}

// 	supabaseProjectRef := os.Getenv("SUPABASE_PROJECT_REF")
// 	supabaseBucket := os.Getenv("SUPABASE_STORAGE_BUCKET")
// 	if supabaseProjectRef == "" || supabaseBucket == "" {
// 		log.Println("bhai env set kar pehle")
// 	}

// 	for i, qJSON := range questionsFromJSON {
// 		//kyunki model mai options and correctanswers (2 aur types change kiye) jsonb mai hai to insert k time marshall karna padega
// 		optionBytes, err := json.Marshal(qJSON.Options)
// 		if err != nil {
// 			log.Printf("Failed to marshal Options for question %d (%s): %v. Skipping.", i+1, qJSON.Question, err)
// 			continue
// 		}

// 		correctAnswerBytes, err := json.Marshal(qJSON.CorrectAnswers)
// 		if err != nil {
// 			log.Printf("Failed to marshal CorrectAnswers for question %d (%s): %v. Skipping.", i+1, qJSON.Question, err)
// 			continue
// 		}
// 		imagePathsBytes, errImg := PathsToJSON(qJSON.ImagePath, supabaseProjectRef, supabaseBucket)
// 		if errImg != nil {
// 			log.Printf("helper func fail huvi imagepath k liye for question %d (%s): %v. Skipping.", i+1, qJSON.Question, errImg)
// 			continue
// 		}
// 		optionImageBytes, errOpt := PathsToJSON(qJSON.OptionImagePaths, supabaseProjectRef, supabaseBucket)
// 		if errOpt != nil {
// 			log.Printf("helper func fail huvi option image path k liye for question %d (%s): %v. Skipping.", i+1, qJSON.Question, errOpt)
// 			continue
// 		}

// 		tagBytes, err := json.Marshal(qJSON.Tag)
// 		if err != nil {
// 			log.Printf("Failed to marshal Tags for question %d (%s): %v. Skipping.", i+1, qJSON.Question, err)
// 			continue
// 		}
// 		questionTypeFromJSON := qJSON.QuestionType // qJSON is from the JSONQuestion struct
// 		if questionTypeFromJSON == "" {
// 			log.Printf("Warning: Question %d (%s) has missing/empty QuestionType in JSON. Defaulting to 'MCQ'.", i+1, qJSON.Question)
// 			questionTypeFromJSON = "MCQ" // Or use "UNKNOWN" or another suitable default
// 		}

// 		questionToBeInserted := models.Question{
// 			Question:         qJSON.Question,
// 			Difficulty:       qJSON.Difficulty,
// 			Subject:          qJSON.Subject,
// 			Topic:            qJSON.Topic,
// 			Marks:            qJSON.Marks,
// 			NegativeMarks:    qJSON.NegativeMarks,
// 			IntegerAnswer:    qJSON.IntegerAnswer,
// 			QuestionType:     qJSON.QuestionType,
// 			Options:          optionBytes,
// 			OptionImagePaths: optionImageBytes,
// 			CorrectAnswers:   correctAnswerBytes,
// 			ImagePath:        imagePathsBytes,
// 			Explanation:      "",
// 			ComprehensionID:  qJSON.ComprehensionID,
// 			Tags:             tagBytes,
// 		}

// 		if qJSON.Explanation != nil {
// 			questionToBeInserted.Explanation = *qJSON.Explanation
// 		}

// 		result := DB.Create(&questionToBeInserted)
// 		if result.Error != nil {
// 			log.Printf("Warning: Failed to insert question %d (%s) into database: %v. Skipping.", i+1, qJSON.Question, result.Error)
// 			continue
// 		}

// 	}
// 	return nil
// }

// func PathsToJSON(pathInput interface{}, projectRef, bucketName string) ([]byte, error) {
// 	if pathInput == nil {
// 		return []byte("[]"), nil
// 	}

// 	if projectRef == "" || bucketName == "" {
// 		log.Println("env mai projectRef aur bucketName daalo")
// 		return nil, fmt.Errorf("missing supabase projectRef or bucketName")
// 	}

// 	var relativePaths []string
// 	switch v := pathInput.(type) {
// 	case string:
// 		if v != "" {
// 			relativePaths = append(relativePaths, v)
// 		}
// 	case []interface{}:
// 		for _, item := range v {
// 			pathString, ok := item.(string)
// 			if ok && pathString != "" {
// 				relativePaths = append(relativePaths, pathString)
// 			}
// 		}
// 	default:
// 		log.Println("aise koi path type nahi hai bhai ")
// 		return nil, nil
// 	}

// 	if len(relativePaths) == 0 {
// 		return nil, nil
// 	}

// 	fullUrls := make([]string, 0, len(relativePaths))
// 	for _, relPath := range relativePaths {
// 		cleanedPath := strings.Trim(filepath.ToSlash(relPath), "/")
// 		publicURL := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/public/%s/%s",
// 			projectRef,
// 			bucketName,
// 			cleanedPath,
// 		)
// 		fullUrls = append(fullUrls, publicURL)
// 	}

// 	jsonBytes, err := json.Marshal(fullUrls)
// 	if err != nil {
// 		log.Printf("Error marshaling full URLs: %v", err)
// 		return nil, fmt.Errorf("failed to marshal full urls: %w", err)
// 	}

// 	return jsonBytes, nil
// }
