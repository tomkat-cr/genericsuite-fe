#!/bin/bash
# File: scripts/npm_publish.sh
#
# Run:
#   sh scripts/npm_publish.sh pre-publish|publish
#
# Options (Defaults to "pre-publish"):
#   pre-publish:  npm run build && npm test
#   publish:      npm publish
#
# 2024-03-16 | CR
#

show_date_time() {
  if [ "${APP_TZ}" = "" ]; then
    APP_TZ='America/New_York'
  fi
  TZ="${APP_TZ}" date
}

turn_on_module() {
    sh "${SCRIPTS_DIR}/run_change_module_setting.sh" on
}

destroy_symlinks() {
    sh "${SCRIPTS_DIR}/run_symlinks_handler.sh" remove
}

REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

ACTION="$1"
if [ -z "${ACTION}" ]; then
  ACTION="pre-publish"
fi

# Make sure module is on (no module1 or type1 changed during last eventually cancelled run)
# and destroy symlinks (e.g. /public/static)
turn_on_module
destroy_symlinks

export PACKAGE_NAME=$(perl -ne 'print $1 if /"name":\s*"([^"]*)"/' package.json)
if [ "${PACKAGE_NAME}" = "" ]; then
    PACKAGE_NAME="N/A"
fi
export PACKAGE_VERSION=$(perl -ne 'print $1 if /"version":\s*"([^"]*)"/' package.json)
if [ "${PACKAGE_VERSION}" = "" ]; then
    PACKAGE_VERSION="N/A"
fi

echo ""
echo "Checking react-app-rewired installation..."
export REACT_APP_REWIRED_INSTALLED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
if [ "${REACT_APP_REWIRED_INSTALLED}" != "" ]; then
    echo ""
    echo "It's highly recommended to remove react-app-rewired."
    echo "(current installed version: ${REACT_APP_REWIRED_INSTALLED})"
    echo "Do you want to proceed (y/n)?"
    read answer
    while [[ ! $answer =~ ^[YyNn]$ ]]; do
        echo "Please enter Y or N"
        read answer
    done
    if [[ $answer =~ ^[Yy]$ ]]; then
        echo "Removing react-app-rewired..."
        if npm uninstall react-app-rewired react-scripts
        then
            echo "react-app-rewired removed."
        else
            echo "ERROR: react-app-rewired not removed."
        fi
    fi
fi

echo ""
echo "Checking vite installation..."
export VITE_INSTALLED=$(perl -ne 'print $1 if /"vite":\s*"([^"]*)"/' package.json)
if [ "${VITE_INSTALLED}" != "" ]; then
    echo ""
    echo "It's highly recommended to remove the vite bundler."
    echo "(current installed version: ${VITE_INSTALLED})"
    echo "Do you want to proceed (y/n)?"
    read answer
    while [[ ! $answer =~ ^[YyNn]$ ]]; do
        echo "Please enter Y or N"
        read answer
    done
    if [[ $answer =~ ^[Yy]$ ]]; then
        echo "Removing vite bundler..."
        if npm uninstall vite @vitejs/plugin-react vite-plugin-require
        then
            echo "vite bundler removed."
        else
            echo "ERROR: vite bundler not removed."
        fi
    fi
fi

echo ""
echo "Checking webpack installation..."
export WEBPACK_INSTALLED=$(perl -ne 'print $1 if /"webpack-dev-server":\s*"([^"]*)"/' package.json)
if [ "${WEBPACK_INSTALLED}" != "" ]; then
    echo ""
    echo "It's highly recommended to remove the webpack bundler."
    echo "(current installed version: ${WEBPACK_INSTALLED})"
    echo "Do you want to proceed (y/n)?"
    read answer
    while [[ ! $answer =~ ^[YyNn]$ ]]; do
        echo "Please enter Y or N"
        read answer
    done
    if [[ $answer =~ ^[Yy]$ ]]; then
        echo "Removing webpack bundler..."
        if npm uninstall webpack webpack-cli webpack-dev-server html-webpack-plugin interpolate-html-plugin
        then
            echo "webpack bundler removed."
        else
            echo "ERROR: webpack bundler not removed."
        fi
    fi
fi

echo "Testing app..."
if ! npm run test
then
    echo "ERROR running: npm run test"
    exit 1
fi

echo "Package Lock (to update App version)..."
if ! npm install --package-lock-only
then
    echo "ERROR running: npm install --package-lock-only"
    exit 1
fi

echo "Building React app..."
if ! npm run build
then
    echo "ERROR running: npm run build"
    exit 1
fi

if [ "${ACTION}" = "publish" ]; then
    echo ""
    echo "Are you sure you want to publish ${PACKAGE_NAME}:${PACKAGE_VERSION} (y/n)?"
    read answer
    if [ "${answer}" = "y" ]; then
        npm publish --access=public
    fi
fi

echo ""
echo "Done with ${ACTION} !"
show_date_time