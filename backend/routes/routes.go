package routes

import (
	"backend/auth"
	"net/http"
)

func RegisterRoutes() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		auth.RenderTemplate(w, "index", map[string]string{"Title": "Home"})
	})

	http.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		auth.RenderTemplate(w, "register", map[string]string{"Title": "Register"})
	})

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		auth.RenderTemplate(w, "login", map[string]string{"Title": "Login"})
	})

	http.HandleFunc("/logout", auth.LogoutHandler)
}
