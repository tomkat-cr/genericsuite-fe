# .DEFAULT_GOAL := local
# .PHONY: tests
SHELL := /bin/bash

# General Commands
help:
	cat Makefile

install:
	npm install

update:
	npm update
	npm audit fix

lock:
	npm install --package-lock-only

build-dev:
	npm run build

build-prod:
	npm run build-prod

build: build-dev

dev:
	npm install --dev

clean:
	npm cache clean --force && rm -rf node_modules

fresh: clean install

# Development Commands
test-dev:
	npm run test-dev

test:
	npm run test

test-run-build:
	. scripts/build_prod_test.sh
	. scripts/build_prod_test.sh restore
 
test-run-build-restore:
	. scripts/build_prod_test.sh restore

eject-dev:
	npm run eject-dev

config:
	sh node_modules/genericsuite/scripts/change_env_be_endpoint.sh dev

config_qa:
	sh node_modules/genericsuite/scripts/change_env_be_endpoint.sh qa

config_demo:
	sh node_modules/genericsuite/scripts/change_env_be_endpoint.sh demo

deploy: config
	sh node_modules/genericsuite/scripts/aws_deploy_to_s3.sh

deploy_qa: config_qa
	sh node_modules/genericsuite/scripts/aws_deploy_to_s3.sh

deploy_demo: config_demo
	sh node_modules/genericsuite/scripts/aws_deploy_to_s3.sh

run: config
	sh node_modules/genericsuite/scripts/run_app_frontend.sh dev

run_qa: config_qa
	sh node_modules/genericsuite/scripts/run_app_frontend.sh qa

server: run
start: run
local: run

run_prod: build-prod
	# sh run_app_frontend.sh
	npm start

tailwind:
	npx @tailwindcss/cli -i ./src/input.css -o ./public/output.css --watch

add_submodules:
	sh node_modules/genericsuite/scripts/add_github_submodules.sh

create_ssl_certs:
	if [ -f ./scripts/create_ssl_certs.sh ]; then sh ./scripts/create_ssl_certs.sh create; else sh node_modules/genericsuite/scripts/create_ssl_certs.sh create; fi

copy_ssl_certs:
	if [ -f ./scripts/create_ssl_certs.sh ]; then sh ./scripts/create_ssl_certs.sh copy; else sh node_modules/genericsuite/scripts/create_ssl_certs.sh copy; fi

## NPM scripts library

config_lib:
	sh scripts/change_env_be_endpoint.sh dev

run_lib: config_lib
	sh scripts/run_app_frontend.sh dev

pre-publish:
	sh scripts/npm_publish.sh pre-publish

publish:
	sh scripts/npm_publish.sh publish
