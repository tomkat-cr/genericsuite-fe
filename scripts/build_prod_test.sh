#!/bin/bash
# File: scripts/build_prod_test.sh
#
# Run:
#   source scripts/build_prod_test.sh test|restore|build
#
# IMPORTANT: run with "source" because it generates the environmet variables needed to restore package.json and tsconfig.json.
#
# Options (Defaults to "test"):
#   "test": prepares tsconfig.json and package.json for local build test and runs: npm run build-dev && npm run start
#   "restore": restores tsconfig.json and package.json from backup in environment variables
#   "build": copy images to build/static/media directory only
#
# 2024-03-15 | CR
#
REPO_BASEDIR="`pwd`"

# cd "`dirname "$0"`" ;
# SCRIPTS_DIR="`pwd`" ;
# Get the real script directory
SCRIPTS_DIR="$( cd -- "$(dirname "$BASH_SOURCE")" >/dev/null 2>&1 ; pwd -P )"

cd "${REPO_BASEDIR}"

echo ""
echo "\$0: $0"
echo "REPO_BASEDIR: ${REPO_BASEDIR}"
echo "SCRIPTS_DIR: ${SCRIPTS_DIR}"
echo ""

remove_symlinks() {
    sh "${SCRIPTS_DIR}/run_symlinks_handler.sh" remove
}

# Defaults

if [ "${RUN_METHOD}" = "" ]; then
    RUN_METHOD="vite"
    # RUN_METHOD="webpack"
    # RUN_METHOD="react-scripts"
fi

RUN_MODE="$1"
if [ "${RUN_MODE}" = "" ]; then
    RUN_MODE="test"
fi

COPY_IMAGES="$2"
if [ "${COPY_IMAGES}" = "" ]; then
    COPY_IMAGES="1"
fi

echo ""
echo "WARNING: This script must be run with: source $0 $1"
echo "Run mode: ${RUN_MODE}"
if [ "${RUN_MODE}" != "build" ]; then
    echo "Press Enter to continue..."
    echo ""
    read
fi
echo ""

if [ "${RUN_MODE}" = "test" ]; then
    export PACKAGE_JSON_HOMEPAGE=$(perl -ne 'print $1 if /"homepage":\s*"([^"]*)"/' package.json)
    echo "package.json PACKAGE_JSON_HOMEPAGE was: ${PACKAGE_JSON_HOMEPAGE}"

    export TSCONFIG_BASE_URL=$(perl -ne 'print $1 if /"baseUrl":\s*"([^"]*)"/' tsconfig.json)
    echo "tsconfig.json TSCONFIG_BASE_URL was: ${TSCONFIG_BASE_URL}"

    sh "${SCRIPTS_DIR}/run_method_dependency_manager.sh" install ${RUN_METHOD}

    if [ "${TSCONFIG_BASE_URL}" = "./src/lib" ]; then
        echo "Preparing tsconfig.json for local build test..."
        perl -i -pe"s|\"baseUrl\": \"./src/lib\"|\"baseUrl\": \"./src\"|g" tsconfig.json
    fi

    echo "Preparing package.json for local build test..."
    perl -i -pe"s|\"type\": \"module\"|\"type1\": \"module\"|g" package.json
    perl -i -pe"s|\"homepage\": \"[^\"]*\"|\"homepage\": \"#\"|g" package.json
fi

if [ "${RUN_MODE}" != "restore" ]; then

    rm -rf ./build

    set -o allexport; source ".env" ; set +o allexport ;
    echo "REACT_APP_API_URL before: ${REACT_APP_API_URL}"
    REACT_APP_API_URL=$(echo $REACT_APP_API_URL | perl -i -pe 's|https:|http:|')
    # REACT_APP_API_URL=$(echo $REACT_APP_API_URL | perl -i -pe 's|:5001|:5002|')
    echo "REACT_APP_API_URL after: ${REACT_APP_API_URL}"
    perl -pi -e 's|^(REACT_APP_API_URL=).*|$1$ENV{REACT_APP_API_URL}|' .env

    # To avoid error message: "ENOENT: no such file or directory, stat './public/static'"
    # during the build process, because the 'static' is a symlink, not a directory
    remove_symlinks

    # npm run build-dev
    if [ "${RUN_METHOD}" = "webpack" ]; then
        run_command="npx webpack --mode production"
    elif [ "${RUN_METHOD}" = "vite" ]; then
        run_command="npx vite build"
    else
        # run_command="npx react-app-rewired build"
        run_command="npm run build-dev"
    fi

    echo ""
    echo ">>--> Running: ${run_command}"
    echo ""
    if ! ${run_command}
    then
        echo "ERROR running: ${run_command}"
        exit 1
    fi

    REACT_APP_API_URL=$(echo $REACT_APP_API_URL | perl -i -pe 's|http:|https:|')
    # REACT_APP_API_URL=$(echo $REACT_APP_API_URL | perl -i -pe 's|:5002|:5001|')
    perl -pi -e 's|^(REACT_APP_API_URL=).*|$1$ENV{REACT_APP_API_URL}|' .env

    if [ "${COPY_IMAGES}" = "1" ]; then
        if ! source ${SCRIPTS_DIR}/build_copy_images.sh
        then
            echo "ERROR running: source ${SCRIPTS_DIR}/build_copy_images.sh"
            exit 1
        fi
    fi
fi

if [ "${RUN_MODE}" = "test" ]; then
    echo "Running server.js to test local build..."
    echo ""
    echo "Press Ctrl-C to end, then run:"
    echo ""
    echo "export PACKAGE_JSON_HOMEPAGE=\"${PACKAGE_JSON_HOMEPAGE}\""
    echo "export TSCONFIG_BASE_URL=\"${TSCONFIG_BASE_URL}\""
    echo "export REACT_APP_REWIRED=\"${REACT_APP_REWIRED}\""
    echo "$0 restore"
    echo ""

    npm run start
fi

if [ "${RUN_MODE}" = "restore" ]; then
    echo "Restore tsconfig.json from local build test..."
    if [ "${TSCONFIG_BASE_URL}" = "./src/lib" ]; then
        echo ""
        echo "tsconfig.json TSCONFIG_BASE_URL will be restored to: ${TSCONFIG_BASE_URL}"
        perl -i -pe"s|\"baseUrl\": \"./src\"|\"baseUrl\": \"./src/lib\"|g" tsconfig.json
    else
        echo "No need to change tsconfig.json's baseUrl... TSCONFIG_BASE_URL was: ${TSCONFIG_BASE_URL}"
    fi    
    echo "Restore package.json from local build test..."
    perl -i -pe"s|\"type1\": \"module\"|\"type\": \"module\"|g" package.json
    if [ "${PACKAGE_JSON_HOMEPAGE}" != "" ]; then
        echo ""
        echo "package.json PACKAGE_JSON_HOMEPAGE will be restored to: ${PACKAGE_JSON_HOMEPAGE}"
        perl -i -pe"s|\"homepage\": \"[^\"]*\"|\"homepage\": \"${PACKAGE_JSON_HOMEPAGE}\"|g" package.json
    else
        echo "No need to change package.json's homepage... PACKAGE_JSON_HOMEPAGE was: ${PACKAGE_JSON_HOMEPAGE}"
    fi

    if [ "${TSCONFIG_BASE_URL}" = "./src/lib" ]; then
        export REACT_APP_REWIRED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
        if [ "${REACT_APP_REWIRED}" != "" ]; then
            echo ""
            echo "Do you want to uninstall react-app-rewired ver. ${REACT_APP_REWIRED} ? (y/n)"
            read answer
            if [ "${answer}" = "y" ]; then
                if npm uninstall --save-dev react-app-rewired
                then
                    echo "react-app-rewired uninstalled."
                else
                    echo "ERROR: react-app-rewired not uninstalled."
                fi
            fi
        fi
    fi
fi

echo ""
echo "Done!"
