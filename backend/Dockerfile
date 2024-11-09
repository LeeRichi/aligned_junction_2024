FROM golang:1.23-alpine AS build
LABEL authors="avugar"

WORKDIR /app
COPY . .

RUN go mod download
RUN go build -o /app/src/cmd/app.exe /app/src/cmd/main.go

FROM alpine:latest

WORKDIR /app
COPY .env .
COPY --from=build /app/src/cmd/app.exe .

CMD ["./app.exe"]