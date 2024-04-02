#!/bin/bash
# File: scripts/build_prod_test.sh
#
# Run:
#   source scripts/build_prod_test.sh test|restore|build
#
# IMPORTANT: run with "source" because ir generates the environmet variables needed to restore package.json and tsconfig.json.
#
# Options (Defaults to "test"):
#   "test": prepares tsconfig.json and package.json for local build test and runs: npm run build-dev && npm run start
#   "restore": restores tsconfig.json and package.json from backup in environment variables
#   "build": copy images to build/static/media directory only
#
# 2024-03-15 | CR
#
REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

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
    export REACT_APP_REWIRED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
    echo "package.json REACT_APP_REWIRED is: ${REACT_APP_REWIRED}"

    export PACKAGE_JSON_HOMEPAGE=$(perl -ne 'print $1 if /"homepage":\s*"([^"]*)"/' package.json)
    echo "package.json PACKAGE_JSON_HOMEPAGE was: ${PACKAGE_JSON_HOMEPAGE}"

    export TSCONFIG_BASE_URL=$(perl -ne 'print $1 if /"baseUrl":\s*"([^"]*)"/' tsconfig.json)
    echo "tsconfig.json TSCONFIG_BASE_URL was: ${TSCONFIG_BASE_URL}"

    if [ "${REACT_APP_REWIRED}" = "" ]; then
        echo "Installing react-app-rewired ..."
        npm install --save-dev --force react-app-rewired
    fi

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

    npm run build-dev

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
