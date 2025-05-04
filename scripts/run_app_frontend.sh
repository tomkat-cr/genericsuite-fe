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
if [ "${RUN_METHOD}" = "" ]; then
    RUN_METHOD="vite"
    # RUN_METHOD="webpack"
    # RUN_METHOD="react-scripts"
fi

set -o allexport; source ".env" ; set +o allexport ;

STAGE="$1"

echo ""
echo "Stage = ${STAGE}"
echo "APP_API_URL_DEV = ${APP_API_URL_DEV}"
echo "RUN_METHOD = ${RUN_METHOD}"
echo ""
if [ "${STAGE}" = "dev" ]; then
    echo "Do you want to run: 1) http, 2) https ?"
    read choice
    while [[ ! $choice =~ ^[12]$ ]]; do
        echo "Please enter 1 or 2"
        read choice
    done
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
        make copy_ssl_certs
    fi
    echo "Run by: ${http_method}"
    echo "* Backend:"
    export APP_API_URL_DEV="${http_method}://${APP_LOCAL_DOMAIN_NAME}:${BACKEND_LOCAL_PORT}"
    export REACT_APP_API_URL="${APP_API_URL_DEV}"
    echo ">>--> New APP_API_URL_DEV = ${APP_API_URL_DEV}"
    echo ">>--> New REACT_APP_API_URL = ${REACT_APP_API_URL}"
fi

# Copy images to build/static/media
if ! source ${SCRIPTS_DIR}/build_copy_images.sh
then
    echo ""
    echo "ERROR running: source ${SCRIPTS_DIR}/build_copy_images.sh"
    exit 1
fi

# Create Symlink to build/static/media for the local runtime
create_symlinks

echo ""
echo "* Frontend:"
echo "${http_method}://${APP_LOCAL_DOMAIN_NAME}:${FRONTEND_LOCAL_PORT}"

export REACT_APP_VERSION=$(cat version.txt)
echo ""
echo "REACT_APP_VERSION = ${REACT_APP_VERSION}"

run_app() {
    # Check if dependencies are installed
    sh "${SCRIPTS_DIR}/run_method_dependency_manager.sh" install ${RUN_METHOD}

    # Run app dependending on the run method
    if [ "${RUN_METHOD}" = "webpack" ]; then
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

    elif [ "${RUN_METHOD}" = "vite" ]; then
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

if [ "${STAGE}" = "dev" ]; then
    run_app
fi

if [ "${STAGE}" = "qa" ]; then
    run_app
fi

if [ "${STAGE}" = "prod" ]; then
	npm start
fi

remove_symlinks

