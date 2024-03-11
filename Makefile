# .DEFAULT_GOAL := local
# .PHONY: tests
SHELL := /bin/bash

# General Commands
help:
	cat Makefile

install:
	npm install

lock:
	npm install --package-lock-only

build-dev:
	npm run build

build-prod:
	npm run build-prod

build: build-dev

publish:
	npm publish --access=public

dev:
	npm install --dev

clean:
	npm --rm

fresh: clean install

# Development Commands
test-dev:
	npm run test-dev

test:
	npm run test

eject-dev:
	npm run eject-dev

config:
	sh scripts/change_env_be_endpoint.sh dev

config_qa:
	sh scripts/change_env_be_endpoint.sh qa

deploy: config
	sh scripts/aws_deploy_to_s3.sh

deploy_qa: config_qa
	sh scripts/aws_deploy_to_s3.sh

run: config
	sh scripts/run_app_frontend.sh dev

run_qa: config_qa
	sh scripts/run_app_frontend.sh qa

server: run
start: run
local: run

run_prod: build-prod
	# sh run_app_frontend.sh
	npm start

tailwind:
	# npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
	npx tailwindcss -i ./src/input.css -o ./public/output.css --watch

add_submodules:
	sh scripts/add_github_submodules.sh

create_ssl_certs:
	sh scripts/create_ssl_certs.sh
