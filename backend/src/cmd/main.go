package main

import (
	"gitlab.com/23vugarr/aligned/src/config"
)

func main() {
	server, err := config.NewServer()
	if err != nil{
		return
	}

	server.Run()
}
