package storage

import (
	"bytes"
	"fmt"
	"io"
	"mime"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

func UploadImagesToSupabase(file multipart.File, fileHeader *multipart.FileHeader, fileName string) (string, error) {
	defer file.Close()

	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)

	part, err := writer.CreateFormFile("file", fileName)
	if err != nil {
		return "", err
	}

	_, err = io.Copy(part, file)
	if err != nil {
		return "", err
	}

	err = writer.Close()
	if err != nil {
		return "", err
	}

	// Prepare upload URL (adjust bucket name as needed)
	bucket := "question-images"
	apiURL := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/%s/%s", os.Getenv("SUPABASE_PROJECT_REF"), bucket, fileName)

	req, err := http.NewRequest("POST", apiURL, &buf)
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+os.Getenv("SUPABASE_API_KEY"))
	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("x-upsert", "true")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		publicURL := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/public/%s/%s", os.Getenv("SUPABASE_PROJECT_REF"), bucket, fileName)
		return publicURL, nil
	} else {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("upload failed: %s", string(bodyBytes))
	}
}

// local files ko upload karne ka script
func UploadToSupabase(projectRef, apiKey, bucket, filePath, destPath string) error {
	url := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/%s/%s", projectRef, bucket, destPath)

	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	var buf bytes.Buffer
	_, err = io.Copy(&buf, file)
	if err != nil {
		return err
	}

	mimeType := mime.TypeByExtension(filepath.Ext(filePath))
	if mimeType == "" {
		mimeType = "application/octet-stream"
	}

	req, err := http.NewRequest("POST", url, &buf)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", mimeType)
	req.Header.Set("x-upsert", "true")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("upload failed: %s", string(body))
	}

	return nil
}
