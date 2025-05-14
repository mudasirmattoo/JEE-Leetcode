package auth

// import (
// 	"backend/db"
// 	"backend/models"
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"net/http"
// 	"os"

// 	"github.com/gorilla/sessions"
// 	"golang.org/x/oauth2"
// 	"golang.org/x/oauth2/google"
// )

// var googleOAuthConfig = &oauth2.Config{
// 	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
// 	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
// 	RedirectURL:  "http://localhost:9080/auth/google/callback",
// 	Scopes:       []string{"email", "profile"},
// 	Endpoint:     google.Endpoint,
// }

// var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))

// func GoogleLoginHandler(w http.ResponseWriter, r *http.Request) {
// 	authURL := googleOAuthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
// 	http.Redirect(w, r, authURL, http.StatusTemporaryRedirect)
// }

// func GoogleCallbackHandler(w http.ResponseWriter, r *http.Request) {
// 	code := r.URL.Query().Get("code")
// 	if code == "" {
// 		http.Error(w, "No code in request", http.StatusBadRequest)
// 		return
// 	}

// 	token, err := googleOAuthConfig.Exchange(context.Background(), code)
// 	if err != nil {
// 		http.Error(w, "Token exchange failed", http.StatusInternalServerError)
// 		return
// 	}

// 	client := googleOAuthConfig.Client(context.Background(), token)
// 	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
// 	if err != nil {
// 		http.Error(w, "Failed to fetch user info", http.StatusInternalServerError)
// 		return
// 	}
// 	defer resp.Body.Close()

// 	var userInfo struct {
// 		ID    string `json:"id"`
// 		Email string `json:"email"`
// 		Name  string `json:"name"`
// 	}

// 	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
// 		http.Error(w, "Failed to parse user info", http.StatusInternalServerError)
// 		return
// 	}

// 	var user models.User
// 	db.DB.Where("email = ?", userInfo.Email).First(&user)

// 	if user.ID == 0 {
// 		user = models.User{
// 			Email:    userInfo.Email,
// 			Username: userInfo.Name,
// 			GoogleID: userInfo.ID,
// 		}
// 		db.DB.Create(&user)
// 	}

// 	session, _ := store.Get(r, "session-name")
// 	session.Values["user_id"] = user.ID
// 	session.Save(r, w)

// 	fmt.Fprintf(w, "User: %s, Email: %s\n", user.Username, user.Email)
// }

// func GoogleLogoutHandler(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "session-name")
// 	delete(session.Values, "user_id")
// 	session.Save(r, w)

// 	fmt.Fprintln(w, "Logged out successfully")
// }
