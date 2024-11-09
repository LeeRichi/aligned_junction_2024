package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AppRouter struct {
	router *gin.Engine
}

func NewAppRouter() *AppRouter {
	r := gin.Default()
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
			fingrid.POST("/request/:requestId", fingRouter.updateRequestById) // not done
		}
	}

	err := r.router.Run(appUrl)
	if err != nil {
		return err
	}

	return nil
}
