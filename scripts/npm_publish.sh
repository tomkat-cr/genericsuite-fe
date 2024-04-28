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

REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

ACTION="$1"
if [ -z "${ACTION}" ]; then
  ACTION="pre-publish"
fi

export PACKAGE_NAME=$(perl -ne 'print $1 if /"name":\s*"([^"]*)"/' package.json)
if [ "${PACKAGE_NAME}" = "" ]; then
    PACKAGE_NAME="N/A"
fi
export PACKAGE_VERSION=$(perl -ne 'print $1 if /"version":\s*"([^"]*)"/' package.json)
if [ "${PACKAGE_VERSION}" = "" ]; then
    PACKAGE_VERSION="N/A"
fi

export REACT_APP_REWIRED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
if [ "${REACT_APP_REWIRED}" != "" ]; then
    echo ""
    echo "It's highly recommended to uninstall react-app-rewired."
    echo "(current installed version: ${REACT_APP_REWIRED})"
    echo "Do you want to proceed (y/n)?"
    read answer
    while [[ ! $answer =~ ^[YyNn]$ ]]; do
        echo "Please enter Y or N"
        read answer
    done
    if [[ $answer =~ ^[Yy]$ ]]; then
        echo "Reoving react-app-rewired..."
        if npm uninstall --save-dev react-app-rewired
        then
            echo "react-app-rewired uninstalled."
        else
            echo "ERROR: react-app-rewired not uninstalled."
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