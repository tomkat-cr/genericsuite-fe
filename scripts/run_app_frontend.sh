#!/bin/bash
# run_app_frontend.sh
# 2023-11-28 | CR

REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

# Defaults
RUN_METHOD="react-scripts"
# RUN_METHOD="webpack"

set -o allexport; source ".env" ; set +o allexport ;

STAGE="$1"

echo ""
echo "Stage = ${STAGE}"
echo "REACT_APP_API_URL_DEV = ${REACT_APP_API_URL_DEV}"
echo "RUN_METHOD = ${RUN_METHOD}"
echo ""
if [ "${STAGE}" = "dev" ]; then
    echo "Do you want to run: 1) http, 2) https ?"
    read choice
    while [[ ! $choice =~ ^[12]$ ]]; do
        echo "Please enter 1 or 2"
        read choice
    done
    if [ "$choice" = "1" ]; then
        echo "Run by: http"
        if [ "${BACKEND_LOCAL_PORT_HTTP}" = "" ]; then
            # BACKEND_LOCAL_PORT_HTTP="5002"
            BACKEND_LOCAL_PORT_HTTP="5001"
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

# Copy images to build/static/media
if ! source ${SCRIPTS_DIR}/build_copy_images.sh
then
    echo ""
    echo "ERROR running: source ${SCRIPTS_DIR}/build_copy_images.sh"
    exit 1
fi

# Create Symlink to build/static/media for the local runtime
if [ ! -L "./public/static" ]; then
    echo ""
    echo "Creating symlink: ./public/static/media"
    echo ""
    if ! ln -s "$(pwd)/build/static" "$(pwd)/public/static"
    then
        echo ""
        echo "ERROR running: ln -s \"$(pwd)/build/static\" \"$(pwd)/public/static\""
        exit 1
    fi
fi


if [ "${STAGE}" = "dev" ]; then
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

if [ "${STAGE}" = "qa" ]; then
    npm run start-dev
fi

if [ "${STAGE}" = "prod" ]; then
	npm start
fi

if [ -L "$(pwd)/public/static" ]; then
    echo ""
    echo "Removing symlink: $(pwd)/public/static"
    echo ""
    if ! rm "$(pwd)/public/static"
    then
        echo ""
        echo "ERROR removing symlink: ./public/static"
        exit 1
    fi
fi
