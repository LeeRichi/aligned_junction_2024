package company

import "gorm.io/gorm"

type ApiResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type CompanyService struct {
	repo *CompanyRepo
}

func NewCompanyService(db *gorm.DB) *CompanyService {
	repo := NewCompanyRepo(db)
	return &CompanyService{repo}
}

func (cs *CompanyService) GetReleases() []string {
	return cs.repo.getReleases()
}

func (cs *CompanyService) GetRequests() ApiResponse {
	return cs.repo.getRequests()
}

func (cs *CompanyService) GetRequestById(requestId string) ApiResponse {
	return cs.repo.getRequestById(requestId)
}

func (cs *CompanyService) GetReleaseById(releaseId string) ApiResponse {
	return cs.repo.getReleaseById(releaseId)
}

func (cs *CompanyService) PostRequest(status int, company int, data string, releaseId int) bool {
	return cs.repo.postRequest(status, company, data, releaseId)
}
