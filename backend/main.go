// package main

// import (
// 	"backend/db"
// 	"backend/routes"
// 	"backend/storage"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"os"
// 	"path/filepath"

// 	"github.com/gorilla/mux"
// 	"github.com/rs/cors"
// )

// func main() {
// 	db.ConnectDB()

// 	router := mux.NewRouter()
// 	routes.RegisterRoutes(router)

// 	corsHandler := cors.New(cors.Options{
// 		AllowedOrigins:   []string{"http://localhost:3000"},
// 		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
// 		AllowedHeaders:   []string{"Content-Type", "Authorization"},
// 		AllowCredentials: true,
// 	})

// 	projectRef := os.Getenv("SUPABASE_PROJECT_REF")
// 	apiKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
// 	bucket := os.Getenv("SUPABASE_STORAGE_BUCKET")
// 	rootDir := "./data/media"

// 	if projectRef == "" || apiKey == "" {
// 		log.Fatal("Missing SUPABASE_PROJECT_REF or API Key")
// 	}

// 	err := filepath.Walk(rootDir, func(path string, info os.FileInfo, err error) error {
// 		if err != nil || info.IsDir() || filepath.Ext(path) != ".png" {
// 			return nil
// 		}

// 		relPath, _ := filepath.Rel(rootDir, path)

// 		go func(p string, rel string) {
// 			err := storage.UploadToSupabase(projectRef, apiKey, bucket, p, rel)
// 			if err != nil {
// 				fmt.Printf("Failed to upload %s: %v\n", rel, err)
// 			} else {
// 				publicURL := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/public/%s/%s", projectRef, bucket, rel)
// 				fmt.Printf("Uploaded %s\n %s\n", rel, publicURL)
// 			}
// 		}(path, relPath)

// 		return nil
// 	})

// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	port := "9080"
// 	log.Printf("Service running on http://localhost:%s ...\n", port)

// 	err = http.ListenAndServe(":"+port, corsHandler.Handler(router))
// 	if err != nil {
// 		log.Fatalf("Could not start the server: %v", err)
// 	}

// }

package main

import (
	"backend/db"
	"backend/routes"
	"backend/storage"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func uploadInitialFiles() {
	log.Println("file upload start horaha")
	projectRef := os.Getenv("SUPABASE_PROJECT_REF")
	apiKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
	bucket := os.Getenv("SUPABASE_STORAGE_BUCKET")
	rootDir := "./data/media"

	if projectRef == "" || apiKey == "" || bucket == "" {
		log.Println("env load karo bhai.")
		return
	}
	if _, err := os.Stat(rootDir); os.IsNotExist(err) {
		log.Printf("Skipping initial file upload: Root directory '%s' does not exist.", rootDir)
		return
	}

	var wg sync.WaitGroup
	err := filepath.Walk(rootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Printf("Error accessing path %q: %v\n", path, err)
			return err
		}
		if info.IsDir() || filepath.Ext(path) != ".png" {
			return nil
		}
		relPath, err := filepath.Rel(rootDir, path)
		if err != nil {
			log.Printf("Error getting relative path for %q: %v\n", path, err)
			return nil
		}
		relPath = filepath.ToSlash(relPath)

		wg.Add(1)
		go func(p string, rel string) {
			defer wg.Done()
			log.Printf("Attempting to upload %s to bucket %s", rel, bucket)
			uploadErr := storage.UploadToSupabase(projectRef, apiKey, bucket, p, rel)
			if uploadErr != nil {
				fmt.Printf("Failed to upload %s: %v\n", rel, uploadErr)
			} else {
				publicURL := fmt.Sprintf("https://%s.supabase.co/storage/v1/object/public/%s/%s", projectRef, bucket, rel)
				fmt.Printf("Successfully uploaded %s\n Public URL: %s\n", rel, publicURL)
			}
		}(path, relPath)
		return nil
	})
	if err != nil {
		log.Printf("Error walking the path %q: %v\n", rootDir, err)
	}
	wg.Wait()
	log.Println("Initial file upload process finished.")
}

func main() {

	db.ConnectDB()

	jsonFilePath := "./data/PYQ_Questions_final_mapped.json"
	log.Printf("Attempting to seed data from %s", jsonFilePath)

	if _, err := os.Stat(jsonFilePath); err == nil {
		err := db.InsertQuestionsFromJSON(jsonFilePath)
		if err != nil {
			log.Printf("Error seeding database from JSON: %v", err)
		} else {
			log.Println("Database seeding from JSON completed.")
		}
	} else if os.IsNotExist(err) {
		log.Printf("JSON seed file not found at %s, skipping seeding.", jsonFilePath)
	} else {
		log.Printf("Error checking JSON seed file %s: %v", jsonFilePath, err)
	}

	uploadInitialFiles()
	router := mux.NewRouter()
	routes.RegisterRoutes(router)

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "9080"
	}
	serverAddr := ":" + port
	handler := corsHandler.Handler(router)

	log.Printf("Server starting on port %s...", port)
	err := http.ListenAndServe(serverAddr, handler)
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
