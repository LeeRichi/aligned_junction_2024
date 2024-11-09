package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab.com/23vugarr/aligned/src/internal/company"
	"gorm.io/gorm"
)

type CompanyRouter struct {
	companyService *company.CompanyService
}

func NewCompanyRouter(db *gorm.DB) *CompanyRouter {
	companyService := company.NewCompanyService(db)
	return &CompanyRouter{companyService}
}

func (cr *CompanyRouter) getTracker(c *gin.Context) {
	releases := cr.companyService.GetReleases()
	c.JSON(http.StatusOK, gin.H{
		"releases": releases,
	})
}

func (cr *CompanyRouter) getRequests(c *gin.Context) {
	requests := cr.companyService.GetRequests()
	c.JSON(http.StatusOK, gin.H{
		"requests": requests,
	})
}

func (cr *CompanyRouter) getRequestById(c *gin.Context) {
	requestId := c.Param("requestId")
	request := cr.companyService.GetRequestById(requestId)
	if request == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"request": request,
	})
}

func (cr *CompanyRouter) getReleaseById(c *gin.Context) {
	releaseId := c.Param("releaseId")
	release := cr.companyService.GetReleaseById(releaseId)
	if release == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Release not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"release": release,
	})
}

func (cr *CompanyRouter) postRequest(c *gin.Context) {
	var requestData struct {
		Data string `json:"data"`
	}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	success := cr.companyService.PostRequest(requestData.Data)
	if success {
		c.JSON(http.StatusCreated, gin.H{"message": "Request created"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
	}
}
