package fingrid

import "gorm.io/gorm"

type FingridService struct {
	repo *FingridRepo
}

func NewFingridService(db *gorm.DB) *FingridService {
	repo := NewFingridRepo(db)
	return &FingridService{repo}
}

func (fs *FingridService) CreateRelease(releaseID uint, startDate, endDate string) bool {
	return fs.repo.createRelease(releaseID, startDate, endDate)
}

func (fs *FingridService) UpdateRequest(requestId string, status int, releaseId int) bool {
	return fs.repo.updateRequest(requestId, status, releaseId)
}
