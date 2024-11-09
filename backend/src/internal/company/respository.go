package company

import (
	"fmt"
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


func (cr *CompanyRepo) getRequests() []string {
	return []string{"Request 1", "Request 2"}
}

func (cr *CompanyRepo) getRequestById(requestId string) string {
	return "Request Details for ID: " + requestId
}

func (cr *CompanyRepo) getReleaseById(releaseId string) string {
	return "Release Details for ID: " + releaseId
}

func (cr *CompanyRepo) postRequest(data string) bool {
	fmt.Println(data)
	return true
}
