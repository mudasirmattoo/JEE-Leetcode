package routes

import (
	"backend/auth"
	"backend/profile"
	"backend/questions"

	"github.com/gorilla/mux"
)

func RegisterRoutes(router *mux.Router) {

	// router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	if r.URL.Path != "/" {
	// 		http.NotFound(w, r)
	// 		return
	// 	}
	// 	auth.RenderTemplate(w, "index", map[string]string{"Title": "Home"})
	// })

	// router.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
	// 	auth.RenderTemplate(w, "register", map[string]string{"Title": "Register"})
	// }).Methods("POST")

	// router.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
	// 	auth.RenderTemplate(w, "login", map[string]string{"Title": "Login"})
	// }).Methods("POST", "GET")

	router.HandleFunc("/logout", auth.LogoutHandler)

	router.HandleFunc("/register-user", auth.RegisterHandler)
	router.HandleFunc("/login-user", auth.LoginHandler)

	router.HandleFunc("/add-question", questions.QuestionFormHandler)

	router.HandleFunc("/profile", profile.ProfileHandler)
}
