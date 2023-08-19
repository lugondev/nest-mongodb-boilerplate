SHELL=/bin/bash

.PHONY: all deploy

include .env.prod

PATH_CURRENT := $(shell pwd)
GIT_COMMIT_LOG := $(shell git log --oneline -1 HEAD)

all: deploy

deploy:
	gcloud run deploy ${PROJECT_NAME} --source . --allow-unauthenticated --region asia-southeast1 --project ${GCP_PROJECT}; \

