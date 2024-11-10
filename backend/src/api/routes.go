package api

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AppRouter struct {
	router *gin.Engine
}

func NewAppRouter() *AppRouter {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	return &AppRouter{r}
}

func (r *AppRouter) Run(appUrl string, db *gorm.DB) error {
	compRouter := NewCompanyRouter(db)
	fingRouter := NewFingridRouter(db)

	v1 := r.router.Group("/v1")
	{
		company := v1.Group("/company")
		{
			company.GET("/tracker", compRouter.getTracker)                // done
			company.GET("/tracker/:releaseId", compRouter.getReleaseById) // done

			company.GET("/myrequests", compRouter.getRequests)               // done
			company.GET("/myrequests/:requestId", compRouter.getRequestById) // done

			company.POST("/request", compRouter.postRequest)
		}

		fingrid := v1.Group("/fingrid")
		{
			fingrid.GET("/tracker", compRouter.getTracker)                    // done
			fingrid.POST("/release", fingRouter.postRelease)                  // done
			fingrid.POST("/request/:requestId", fingRouter.updateRequestById) // done
		}

		llm := v1.Group("/llm")
		{
			llm.POST("/query", func(c *gin.Context) {
				var query struct {
					Question string `json:"question"`
				}

				if err := c.BindJSON(&query); err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
					return
				}

				queryBody, _ := json.Marshal(map[string]string{
					"question": query.Question,
				})

				responseBody := bytes.NewBuffer(queryBody)
				resp, err := http.Post("http://llm:8000/query", "application/json", responseBody)

				if err != nil {
					log.Printf("Error occurred while making HTTP request: %v", err)
					c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Failed to connect to the LLM service"})
					return
				}
				defer resp.Body.Close()

				body, err := io.ReadAll(resp.Body)
				if err != nil {
					log.Printf("Error occurred while reading response body: %v", err)
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response from LLM service"})
					return
				}

				sb := string(body)
				c.JSON(http.StatusOK, gin.H{
					"result": sb,
				})
			})
		}

		err := r.router.Run(appUrl)
		if err != nil {
			return err
		}

		return nil
	}
}
