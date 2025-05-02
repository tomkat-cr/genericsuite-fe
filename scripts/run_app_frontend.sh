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
RUN_LIB="$2"

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
    run_command="$1"
    if [ "${RUN_LIB}" = "" ]; then
        INSTALL_OPTIONS="--save-dev"
    else
        INSTALL_OPTIONS="--save-peer --strict-peer-deps"
    fi

    if [ "${RUN_METHOD}" = "webpack" ]; then

        export WEBPACK_INSTALLED=$(perl -ne 'print $1 if /"webpack-dev-server":\s*"([^"]*)"/' package.json)
        if [ "${WEBPACK_INSTALLED}" = "" ]; then
            echo ""
            echo "Installing the webpack bundler..."
            if npm install ${INSTALL_OPTIONS} webpack webpack-cli webpack-dev-server html-webpack-plugin interpolate-html-plugin
            then
                echo "webpack bundler installed."
            else
                echo "ERROR: webpack bundler could not be installed."
            fi
        fi
        turn_off_module
        if [ "${run_command}" = "" ]; then
            run_command="npm run start-dev-webpack"
            run_command="npx webpack-dev-server --config webpack.config.js"
        fi
        if ! ${run_command}
        then
            echo "ERROR running: ${run_command}"
            turn_on_module
            exit 1
        fi
        turn_on_module

    elif [ "${RUN_METHOD}" = "vite" ]; then

        export VITE_INSTALLED=$(perl -ne 'print $1 if /"vite":\s*"([^"]*)"/' package.json)
        if [ "${VITE_INSTALLED}" = "" ]; then
            echo ""
            echo "Installing the vite bundler..."
            if npm install ${INSTALL_OPTIONS} vite @vitejs/plugin-react vite-plugin-require
            then
                echo "vite bundler installed."
            else
                echo "ERROR: vite bundler could not be installed."
            fi
        fi
        if [ "${run_command}" = "" ]; then
            # run_command="npm run start-dev-vite"
            run_command="npx vite dev"
        fi
        turn_off_module
        if ! VITE_CJS_TRACE=true ${run_command}
        then
            echo "ERROR running: ${run_command}"            
            turn_on_module
            exit 1
        fi
        turn_on_module

    else

        export REACT_APP_REWIRED_INSTALLED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
        if [ "${REACT_APP_REWIRED_INSTALLED}" = "" ]; then
            echo ""
            echo "Installing react-app-rewired."
            if npm install ${INSTALL_OPTIONS} --legacy-peer-deps react-app-rewired react-scripts
            then
                echo "react-app-rewired installed."
            else
                echo "ERROR: react-app-rewired could not be installed."
            fi
        fi
        if [ "${run_command}" = "" ]; then
            run_command="npm run start-dev"
            # run_command="npx react-app-rewired start"
        fi
        if ! ${run_command}
        then
            echo "ERROR running: react-app-rewired start"
            exit 1
        fi
    fi
}

if [ "${STAGE}" = "dev" ]; then
    run_app ""
fi

if [ "${STAGE}" = "qa" ]; then
    run_app ""
fi

if [ "${STAGE}" = "prod" ]; then
	npm start
fi

remove_symlinks

