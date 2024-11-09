package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	AppUrl      string
	DatabaseUrl string
	JwtSecret   string
}

func NewEnv() *Env {
	err := godotenv.Load()
	if err != nil {
		return nil
	}

	return &Env{
		AppUrl:      os.Getenv("APP_URL"),
		DatabaseUrl: os.Getenv("DATABASE_URL"),
	}
}
