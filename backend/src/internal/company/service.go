package company

import "gorm.io/gorm"

type CompanyService struct {
	repo *CompanyRepo
}

func NewCompanyService(db *gorm.DB) *CompanyService {
	repo := NewCompanyRepo(db)
	return &CompanyService{repo}
}

func (cs *CompanyService) GetReleases() []string {
	// Replace with actual logic to fetch releases from the repository
	return cs.repo.getReleases()
}

func (cs *CompanyService) GetRequests() []string {
	// Replace with actual logic to fetch requests from the repository
	return cs.repo.getRequests()
}

func (cs *CompanyService) GetRequestById(requestId string) string {
	// Replace with actual logic to fetch a request by ID from the repository
	return cs.repo.getRequestById(requestId)
}

func (cs *CompanyService) GetReleaseById(releaseId string) string {
	// Replace with actual logic to fetch a release by ID from the repository
	return cs.repo.getReleaseById(releaseId)
}

func (cs *CompanyService) PostRequest(data string) bool {
	// Replace with actual logic to post a new request to the repository
	return cs.repo.postRequest(data)
}
