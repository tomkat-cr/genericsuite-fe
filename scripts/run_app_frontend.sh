#!/bin/bash
# run_app_frontend.sh
# 2023-11-28 | CR

RUN_METHOD="react-scripts"
# RUN_METHOD="webpack"

set -o allexport; source ".env" ; set +o allexport ;

echo ""
echo "Stage = $1"
echo "REACT_APP_API_URL_DEV = ${REACT_APP_API_URL_DEV}"
echo "RUN_METHOD = ${RUN_METHOD}"
echo ""
if [ "$1" = "dev" ]; then
    echo "Do you want to run: 1) http, 2) https ?"
    read choice
    while [[ ! $choice =~ ^[12]$ ]]; do
        echo "Please enter 1 or 2"
        read choice
    done
    if [ "$choice" = "1" ]; then
        echo "Run by: http"
        if [ "${BACKEND_LOCAL_PORT_HTTP}" = "" ]; then
            BACKEND_LOCAL_PORT_HTTP="5002"
        fi
        if [ "${APP_LOCAL_DOMAIN_NAME}" = "" ]; then
            if [ "${REACT_APP_APP_NAME}" = "" ]; then
                echo "ERROR: REACT_APP_APP_NAME environment variable not defined"
                exit 1
            fi
            APP_NAME_LOWERCASE=$(echo ${REACT_APP_APP_NAME} | tr '[:upper:]' '[:lower:]')
            APP_LOCAL_DOMAIN_NAME="app.${APP_NAME_LOWERCASE}.local"
        fi
        export REACT_APP_API_URL_DEV="http://${APP_LOCAL_DOMAIN_NAME}:${BACKEND_LOCAL_PORT_HTTP}"
        export REACT_APP_API_URL="${REACT_APP_API_URL_DEV}"
        echo ">>--> New REACT_APP_API_URL_DEV = ${REACT_APP_API_URL_DEV}"
        echo ">>--> New REACT_APP_API_URL = ${REACT_APP_API_URL}"
    else
        echo "Run by: https"
    fi
fi
if [ "$1" = "dev" ]; then
    if [ "${RUN_METHOD}" = "webpack" ]; then
        perl -i -pe"s|\"type\": \"module\"|\"type1\": \"module\"|g" package.json
        perl -i -pe"s|\%PUBLIC_URL\%||g" public/index.html
        npm run start-dev-webpack
        cp public/index-template.html public/index.html
        perl -i -pe"s|\"type1\": \"module\"|\"type\": \"module\"|g" package.json
    else
        export REACT_APP_VERSION=$(cat version.txt)
        echo "REACT_APP_VERSION = ${REACT_APP_VERSION}"
        npm run start-dev
    fi
fi

if [ "$1" = "qa" ]; then
    npm run start-dev
fi

if [ "$1" = "prod" ]; then
	npm start
fi
