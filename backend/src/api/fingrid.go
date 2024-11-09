package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab.com/23vugarr/aligned/src/internal/fingrid"
	"gorm.io/gorm"
)

type FingridRouter struct {
	fingridService *fingrid.FingridService
}

func NewFingridRouter(db *gorm.DB) *FingridRouter {
	fingridService := fingrid.NewFingridService(db)
	return &FingridRouter{fingridService}
}

func (fr *FingridRouter) postRelease(c *gin.Context) {
	var releaseData struct {
		ReleaseID uint   `json:"release_id"`
		StartDate string `json:"start_date"`
		EndDate   string `json:"end_date"`
	}
	if err := c.BindJSON(&releaseData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	success := fr.fingridService.CreateRelease(releaseData.ReleaseID, releaseData.StartDate, releaseData.EndDate)
	if success {
		c.JSON(http.StatusCreated, gin.H{"message": "Release created"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create release"})
	}
}

func (fr *FingridRouter) updateRequestById(c *gin.Context) {
	requestId := c.Param("requestId")
	var updateData struct {
		ReleaseID int `json:"release_id"`
		Status    int `json:"status"`
	}

	if err := c.BindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	success := fr.fingridService.UpdateRequest(requestId, updateData.Status, updateData.ReleaseID)
	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Request updated"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update request"})
	}
}
