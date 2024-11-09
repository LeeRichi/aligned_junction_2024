package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type FingridRouter struct {
}

func NewFingridRouter() *FingridRouter {
	return &FingridRouter{}
}

func (fr *FingridRouter) postRelease(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}

func (fr *FingridRouter) updateRequestById(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}
