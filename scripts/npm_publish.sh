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

# Defaults

if [ "${RUN_METHOD}" = "" ]; then
    RUN_METHOD="vite"
    # RUN_METHOD="webpack"
    # RUN_METHOD="react-scripts"
fi

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

check_one_bundle() {
    bundle_installed="$1"
    bundle_name="$2"
    echo ""
    echo "Checking ${bundle_name} installation..."
    if [ "${bundle_installed}" != "" ]; then
        echo ""
        echo "It's highly recommended to remove ${bundle_name}."
        echo "(current installed version: ${bundle_installed})"
        echo "Do you want to proceed (y/n)?"
        read answer
        while [[ ! $answer =~ ^[YyNn]$ ]]; do
            echo "Please enter Y or N"
            read answer
        done
        if [[ $answer =~ ^[Yy]$ ]]; then
            sh "${SCRIPTS_DIR}/run_method_dependency_manager.sh" uninstall ${bundle_name}
        fi
    fi
}

export REACT_APP_REWIRED_INSTALLED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
export VITE_INSTALLED=$(perl -ne 'print $1 if /"vite":\s*"([^"]*)"/' package.json)
export WEBPACK_INSTALLED=$(perl -ne 'print $1 if /"webpack-dev-server":\s*"([^"]*)"/' package.json)
check_one_bundle "${REACT_APP_REWIRED_INSTALLED}" "react-app-rewired"
check_one_bundle "${VITE_INSTALLED}" "vite"
check_one_bundle "${WEBPACK_INSTALLED}" "webpack"

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