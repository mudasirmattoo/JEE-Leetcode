DB_URL=postgres://moomin:moomin@localhost:5432/tango?sslmode=disable

migrate-up:
	migrate -path migrations -database "$(DB_URL)" up

migrate-down:
	migrate -path migrations -database "$(DB_URL)" down

migrate-force:
	migrate -path migrations -database "$(DB_URL)" force <version>

migrate-new:
	migrate create -ext sql -dir migrations -seq $(name)

