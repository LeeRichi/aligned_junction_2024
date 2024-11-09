package config

import (
	"gitlab.com/23vugarr/aligned/src/api"
)

type Server struct {
	AppUrl string
	Db     *Database
	Router *api.AppRouter
}

func NewServer() (*Server, error) {
	env := NewEnv()

	db, err := NewDatabase(env.DatabaseUrl)
	if err != nil {
		return nil, err
	}

	router := api.NewAppRouter()

	return &Server{
		AppUrl: env.AppUrl,
		Db:     db,
		Router: router,
	}, nil
}

func (s *Server) Run() error {
	err := s.Router.Run(s.AppUrl, s.Db.Db)
	if err != nil {
		return err
	}

	return nil
}
