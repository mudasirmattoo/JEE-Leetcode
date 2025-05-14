package auth

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

type contextKey string

const UserIDKey contextKey = "userID"
const UserRoleKey contextKey = "userRole"

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := godotenv.Load()
		if err != nil {
			log.Printf("Warning: Failed to load .env file: %v", err)
		}

		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			log.Println("Error: JWT Secret key not found in environment variables")
			http.Error(w, "Internal server error: JWT configuration missing", http.StatusInternalServerError)
			return
		}

		tokenString, err := GetTokenFromRequest(r)
		if err != nil {
			log.Printf("Authorization error: %v", err)
			http.Error(w, "Unauthorized: "+err.Error(), http.StatusUnauthorized)
			return
		}

		claims := jwt.MapClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(jwtSecret), nil
		})

		if err != nil {
			log.Printf("Token parsing/validation error: %v", err)
			if err == jwt.ErrTokenExpired {
				http.Error(w, "Unauthorized: Token has expired", http.StatusUnauthorized)
				return
			}
			http.Error(w, "Unauthorized: Invalid token", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			http.Error(w, "Unauthorized: Invalid token (token.Valid is false)", http.StatusUnauthorized)
			return
		}

		userID_uuid_string, okSub := claims["sub"].(string)
		userRole, okRole := claims["role"].(string)

		if !okSub {
			log.Println("Error: 'sub' claim (user ID) missing or not a string in token")
			http.Error(w, "Unauthorized: Invalid token claims (missing user ID)", http.StatusUnauthorized)
			return
		}
		if !okRole {
			log.Printf("Warning: 'role' claim missing or not a string in token for user %s. Defaulting role.", userID_uuid_string)
			userRole = "authenticated"
		}

		ctx := context.WithValue(r.Context(), UserIDKey, userID_uuid_string)
		ctx = context.WithValue(ctx, UserRoleKey, userRole)

		log.Printf("Authenticated user: %s, Role: %s", userID_uuid_string, userRole)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func GetTokenFromRequest(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader != "" {
		parts := strings.Split(authHeader, " ")
		if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
			return parts[1], nil
		}
		return "", fmt.Errorf("malformed Authorization header")
	}

	cookie, err := r.Cookie("token")
	if err == nil {
		return cookie.Value, nil
	}

	return "", fmt.Errorf("no token found in request")
}
