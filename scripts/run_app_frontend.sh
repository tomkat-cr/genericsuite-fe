#!/bin/bash
# run_app_frontend.sh
# 2023-11-28 | CR

REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

turn_off_module() {
    sh "${SCRIPTS_DIR}/run_change_module_setting.sh" off
}

turn_on_module() {
    sh "${SCRIPTS_DIR}/run_change_module_setting.sh" on
}

create_symlinks() {
    sh "${SCRIPTS_DIR}/run_symlinks_handler.sh" create
}

remove_symlinks() {
    sh "${SCRIPTS_DIR}/run_symlinks_handler.sh" remove
}

# Defaults
if [ "${RUN_BUNDLER}" = "" ]; then
    RUN_BUNDLER="vite"
fi

# Whether to use containers engine app for local development environment when RUN_PROTOCOL="https".
USE_CONTAINERS_ENGINE_APP=1

# Run protocol and port replacement: automatic protocol and port replacement for
# local development environment variables REACT_APP_API_URL and APP_API_URL
# when RUN_PROTOCOL="https" can be turned off by assigning RUN_PROTOCOL_AND_PORT_REPLACEMENT=0.
RUN_PROTOCOL_AND_PORT_REPLACEMENT=1

# Read environment variables from .env file
set -o allexport; source ".env" ; set +o allexport ;

STAGE="$1"
STAGE_UPPERCASE=$(echo "${STAGE}" | tr '[:lower:]' '[:upper:]')
# Check stage is valid
if [ "${STAGE_UPPERCASE}" != "DEV" ] && [ "${STAGE_UPPERCASE}" != "QA" ] && [ "${STAGE_UPPERCASE}" != "PROD" ] && [ "${STAGE_UPPERCASE}" != "DEMO" ]; then
    echo "ERROR: Invalid stage: ${STAGE}"
    exit 1
fi

echo ""
echo "Stage = ${STAGE}"
echo "APP_API_URL_DEV = ${APP_API_URL_DEV}"
echo "RUN_BUNDLER = ${RUN_BUNDLER}"
echo "RUN_PROTOCOL = ${RUN_PROTOCOL}"
echo "USE_CONTAINERS_ENGINE_APP = ${USE_CONTAINERS_ENGINE_APP}"
echo "RUN_PROTOCOL_AND_PORT_REPLACEMENT = ${RUN_PROTOCOL_AND_PORT_REPLACEMENT}"
echo ""
if [ "${STAGE_UPPERCASE}" = "DEV" ]; then
    if [ "${RUN_PROTOCOL}" != "" ]; then
        if [ "${RUN_PROTOCOL}" = "http" ]; then
            choice="1"
        elif [ "${RUN_PROTOCOL}" = "https" ]; then
            choice="2"
        else
            echo "ERROR: Invalid run protocol: ${RUN_PROTOCOL}"
            exit 1
        fi
    else
        echo "Do you want to run: 1) http, 2) https ?"
        read choice
        while [[ ! $choice =~ ^[12]$ ]]; do
            echo "Please enter 1 or 2"
            read choice
        done
    fi
    if [ "${FRONTEND_LOCAL_PORT}" = "" ]; then
        FRONTEND_LOCAL_PORT="3000"
    fi
    if [ "${BACKEND_LOCAL_PORT}" = "" ]; then
        BACKEND_LOCAL_PORT="5000"
    fi
    if [ "${APP_LOCAL_DOMAIN_NAME}" = "" ]; then
        if [ "${REACT_APP_APP_NAME}" = "" ]; then
            echo "ERROR: REACT_APP_APP_NAME environment variable not defined"
            exit 1
        fi
        APP_NAME_LOWERCASE=$(echo ${REACT_APP_APP_NAME} | tr '[:upper:]' '[:lower:]')
        APP_LOCAL_DOMAIN_NAME="app.${APP_NAME_LOWERCASE}.local"
    fi
    if [ "$choice" = "1" ]; then
        http_method="http"
    else
        http_method="https"
        if [ "${USE_CONTAINERS_ENGINE_APP}" = "1" ]; then
            make copy_ssl_certs
        else
            echo "Skipping SSL certs copy becasue USE_CONTAINERS_ENGINE_APP is not set to 1"
        fi
    fi
    echo "Run by: ${http_method}"
    echo "* Backend:"
    if [ "${RUN_PROTOCOL_AND_PORT_REPLACEMENT}" = "1" ]; then
        export APP_API_URL_DEV="${http_method}://${APP_LOCAL_DOMAIN_NAME}:${BACKEND_LOCAL_PORT}"
        export REACT_APP_API_URL="${APP_API_URL_DEV}"
        echo ">>--> New APP_API_URL_DEV = ${APP_API_URL_DEV}"
        echo ">>--> New REACT_APP_API_URL = ${REACT_APP_API_URL}"
    else
        export REACT_APP_API_URL="${APP_API_URL_DEV}"
        echo ">>--> REACT_APP_API_URL = ${REACT_APP_API_URL}"
    fi
fi

# Copy images to build/static/media
if ! source ${SCRIPTS_DIR}/build_copy_images.sh "" ""
then
    echo ""
    echo "ERROR running: source ${SCRIPTS_DIR}/build_copy_images.sh"
    exit 1
fi

# Create Symlink to build/static/media for the local runtime
create_symlinks

echo ""
echo "* Frontend:"
if [ "${RUN_PROTOCOL_AND_PORT_REPLACEMENT}" = "1" ]; then
    echo "${http_method}://${APP_LOCAL_DOMAIN_NAME}:${FRONTEND_LOCAL_PORT}"
else
    APP_FE_URL="$(eval echo \"\$APP_FE_URL_${STAGE_UPPERCASE}\")"
    echo "${APP_FE_URL}"
fi

export REACT_APP_VERSION=$(cat version.txt)
echo ""
echo "REACT_APP_VERSION = ${REACT_APP_VERSION}"

run_app() {
    # Check if dependencies are installed
    sh "${SCRIPTS_DIR}/run_method_dependency_manager.sh" install ${RUN_BUNDLER}

    # Run app dependending on the run method
    if [ "${RUN_BUNDLER}" = "webpack" ]; then
        turn_off_module
        # run_command="npm run start-dev-webpack"
        run_command="npx webpack-dev-server --config webpack.config.js"
        if ! ${run_command}
        then
            echo "ERROR running: ${run_command}"
            turn_on_module
            exit 1
        fi
        turn_on_module

    elif [ "${RUN_BUNDLER}" = "vite" ]; then
        # run_command="npm run start-dev-vite"
        run_command="npx vite dev"
        turn_off_module
        if ! VITE_CJS_TRACE=true ${run_command}
        then
            echo "ERROR running: ${run_command}"            
            turn_on_module
            exit 1
        fi
        turn_on_module

    else
        run_command="npm run start-dev"
        # This does not work... the package.json "start-dev" script must be used
        # run_command="npx react-app-rewired start"
        if ! ${run_command}
        then
            echo "ERROR running: react-app-rewired (${run_command})"
            exit 1
        fi
    fi
}

if [ "${STAGE_UPPERCASE}" = "DEV" ]; then
    run_app
fi

if [ "${STAGE_UPPERCASE}" = "QA" ]; then
    run_app
fi

if [ "${STAGE_UPPERCASE}" = "PROD" ]; then
	npm start
fi

remove_symlinks

