package main

import (
	"backend/db"
	"backend/routes"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	db.ConnectDB()

	router := mux.NewRouter()
	routes.RegisterRoutes(router)

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	port := "9080"
	log.Printf("Service running on http://localhost:%s ...\n", port)

	err := http.ListenAndServe(":"+port, corsHandler.Handler(router))
	if err != nil {
		log.Fatalf("Could not start the server: %v", err)
	}
}
