package company

import (
	"log"

	"gorm.io/gorm"
)

type CompanyRepo struct {
	db *gorm.DB
}

func NewCompanyRepo(db *gorm.DB) *CompanyRepo {
	return &CompanyRepo{db: db}
}

func (cr *CompanyRepo) getReleases() []string {
	var releases []string

	err := cr.db.Model(&Tracker{}).Select("release_id").Find(&releases).Error
	if err != nil {
		log.Println("Error querying releases:", err)
		return nil
	}

	return releases
}

func (cr *CompanyRepo) getRequests() ApiResponse {
	var requests []Requests

	err := cr.db.Model(&Requests{}).Find(&requests).Error
	if err != nil {
		return ApiResponse{
			Status:  "error",
			Message: "Error retrieving requests: " + err.Error(),
			Data:    nil,
		}
	}

	return ApiResponse{
		Status:  "success",
		Message: "Requests retrieved successfully",
		Data:    requests,
	}
}

func (cr *CompanyRepo) getRequestById(requestId string) ApiResponse {
	var request Tracker
	err := cr.db.Model(&Tracker{}).Where("id = ?", requestId).First(&request).Error
	if err != nil {
		return ApiResponse{
			Status:  "error",
			Message: "Request not found: " + err.Error(),
			Data:    nil,
		}
	}

	return ApiResponse{
		Status:  "success",
		Message: "Request details retrieved successfully",
		Data:    request,
	}
}

func (cr *CompanyRepo) getReleaseById(releaseId string) ApiResponse {
	var release Tracker

	err := cr.db.Model(&Tracker{}).Where("release_id = ?", releaseId).First(&release).Error
	if err != nil {
		log.Println("Error querying release:", err)
		return ApiResponse{
			Status:  "error",
			Message: "Release not found",
			Data:    nil,
		}
	}

	return ApiResponse{
		Status:  "success",
		Message: "Release details retrieved successfully",
		Data:    release,
	}
}

func (cr *CompanyRepo) postRequest(status int, company int, data string, releaseId int) bool {
	request := Requests{
		ReleaseID:   uint(releaseId),
		Status:      status,
		Company:     company,
		RequestBody: data,
	}

	if err := cr.db.Create(&request).Error; err != nil {
		log.Println("Error creating release:", err)
		return false
	}

	return true
}
