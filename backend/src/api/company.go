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
	response := cr.companyService.GetRequests()

	c.JSON(http.StatusOK, gin.H{
		"status":  response.Status,
		"message": response.Message,
		"data":    response.Data,
	})
}

func (cr *CompanyRouter) getRequestById(c *gin.Context) {
	requestId := c.Param("requestId")
	response := cr.companyService.GetRequestById(requestId)

	c.JSON(http.StatusOK, gin.H{
		"status":  response.Status,
		"message": response.Message,
		"data":    response.Data,
	})
}

func (cr *CompanyRouter) getReleaseById(c *gin.Context) {
	releaseId := c.Param("releaseId")
	response := cr.companyService.GetReleaseById(releaseId)

	if response.Status == "error" {
		c.JSON(http.StatusNotFound, gin.H{"error": response.Message})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  response.Status,
		"message": response.Message,
		"data":    response.Data,
	})
}

func (cr *CompanyRouter) postRequest(c *gin.Context) {
	var requestData struct {
		Data      string `json:"request_body"`
		ReleaseID uint   `json:"release_id"`
		Status    int    `json:"status"`
		Company   int    `json:"company"`
	}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	success := cr.companyService.PostRequest(requestData.Status, requestData.Company, requestData.Data, int(requestData.ReleaseID))
	if success {
		c.JSON(http.StatusCreated, gin.H{"message": "Request created"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
	}
}
