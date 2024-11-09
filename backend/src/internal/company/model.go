package company

import (
	"time"

	"gorm.io/gorm"
)

type Tracker struct {
	gorm.Model
	ReleaseID uint      `json:"release_id" gorm:"primaryKey"`
	StartDate time.Time `json:"start_date" gorm:"not null"`
	EndDate   time.Time `json:"end_date"`
}

type Requests struct {
	gorm.Model
	ReleaseID   uint   `json:"release_id" gorm:"not null;index"`
	Status      int    `json:"status" gorm:"not null"`
	Company     int    `json:"company" gorm:"not null"`
	RequestBody string `json:"request_body" gorm:"type:text;not null"`
}

type RequestStatusChange struct {
	gorm.Model
	RequestID     uint `json:"request_id" gorm:"not null;index"`
	CurrentStatus int  `json:"current_status" gorm:"not null"`
}

type Events struct {
	gorm.Model
	ReleaseID uint      `json:"release_id" gorm:"not null;index"`
	EventType int       `json:"event_type" gorm:"not null"`
	Date      time.Time `json:"date" gorm:"not null"`
}
