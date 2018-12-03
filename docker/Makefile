#!/bin/sh
export USER_ID =$(shell id -u)

server:
	docker exec -it -u node node-server bash -c 'yarn && yarn start'

compose:
	@echo User id for node will:  $$user_UID
	docker-compose up -d

stop:
	docker-compose stop

create-db:
ifndef name
	@echo a database name must given like "make create-db name=Test"
	@exit 1
endif
	@echo create database: ${name}
	@docker exec mysql bash -c 'mysqladmin -proot create $(name)'
