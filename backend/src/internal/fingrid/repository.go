package fingrid

import (
	"log"
	"time"

	"gitlab.com/23vugarr/aligned/src/internal/company"
	"gorm.io/gorm"
)

type FingridRepo struct {
	db *gorm.DB
}

func NewFingridRepo(db *gorm.DB) *FingridRepo {
	return &FingridRepo{db: db}
}

func (fr *FingridRepo) createRelease(releaseID uint, startDate, endDate string) bool {
	parsedStartDate, err := time.Parse("2006-01-02", startDate)
	if err != nil {
		log.Println("Error parsing start date:", err)
		return false
	}
	parsedEndDate, err := time.Parse("2006-01-02", endDate)
	if err != nil {
		log.Println("Error parsing end date:", err)
		return false
	}

	release := company.Tracker{
		ReleaseID: releaseID,
		StartDate: parsedStartDate,
		EndDate:   parsedEndDate,
	}

	if err := fr.db.Create(&release).Error; err != nil {
		log.Println("Error creating release:", err)
		return false
	}

	return true
}

func (fr *FingridRepo) updateRequest(requestId string, status int, releaseId int) bool {
	var request company.Requests
	if err := fr.db.Model(&company.Requests{}).Where("id = ?", requestId).First(&request).Error; err != nil {
		log.Println("Error finding request:", err)
		return false
	}

	if request.Status != status || request.ReleaseID != uint(releaseId) {
		var requestChange company.RequestStatusChange = company.RequestStatusChange{
			RequestID:     request.ID,
			CurrentStatus: status,
			PrevStatus:    request.Status,
		}
		if err := fr.db.Create(&requestChange).Error; err != nil {
			log.Println("Error creating release:", err)
			return false
		}
	}

	request.Status = status
	request.ReleaseID = uint(releaseId)
	if err := fr.db.Save(&request).Error; err != nil {
		log.Println("Error updating request:", err)
		return false
	}

	return true
}
