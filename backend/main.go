package main

import (
	"backend/db"
	"log"
	"net/http"
)

func main() {

	db.ConnectDB()

	port := "9080"
	log.Printf("user service running on %s ...\n", port)

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("Could not start server: %v", err)
	}
}
