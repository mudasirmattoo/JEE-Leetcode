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
	router.HandleFunc("/logout", auth.AuthMiddleware(auth.LogoutHandler))

	router.HandleFunc("/post-question", auth.AuthMiddleware(questions.QuestionFormHandler))

	router.HandleFunc("/profile", auth.AuthMiddleware(profile.AccountHandler))
	router.HandleFunc("edit-profile", auth.AuthMiddleware(auth.EditProfileHandler))

	router.HandleFunc("/submit-question", auth.AuthMiddleware(questions.SubmitHandler))
}
