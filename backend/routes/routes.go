package routes

import (
	"backend/auth"
	"backend/profile"
	"backend/questions"

	"github.com/gorilla/mux"
)

func RegisterRoutes(router *mux.Router) {

	router.HandleFunc("/register-user", auth.RegisterHandler)
	router.HandleFunc("/login-user", auth.LoginHandler)
	router.HandleFunc("/logout", auth.LogoutHandler)

	router.HandleFunc("/add-question", questions.QuestionFormHandler)

	router.HandleFunc("/profile", auth.AuthMiddleware(profile.AccountHandler))
}
