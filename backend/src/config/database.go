package config

import (
	"gitlab.com/23vugarr/aligned/src/internal/company"
	"gorm.io/driver/postgres"

	"gorm.io/gorm"
)

type Database struct {
	Db *gorm.DB
}

func NewDatabase(dsn string) (*Database, error) {
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	_ = db.AutoMigrate(&company.Tracker{}, &company.Requests{}, &company.RequestStatusChange{}, &company.Events{})

	return &Database{
		Db: db,
	}, nil
}
