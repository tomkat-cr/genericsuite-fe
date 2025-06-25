#!/bin/bash
# File: scripts/run_method_dependency_manager.sh
# 2025-05-04 | CR
#

help() {
    echo ""
    echo "Usage: sh run_method_dependency_manager.sh <action> <run-method> <run-lib>"
    echo ""
    echo "The action could be: install, uninstall"
    echo "The run method could be: vite, webpack, react-scripts"
    echo "The run-lib is optional and can be:"
    echo "  blank: install as dev dependency"
    echo "  1: install as peer dependency"
    echo ""
    exit 1
}

uninstall_one_bundle() {
    bundle_installed="$1"
    bundle_name="$2"
    bundle_packages="$3"
    echo ""
    echo "Checking ${bundle_name} installation: '${bundle_installed}'"
    if [ "${bundle_installed}" = "" ]; then
        echo "${bundle_name} not installed..."
    else
        echo "Removing ${bundle_name} bundle..."
        echo "npm uninstall ${bundle_packages}"
        echo ""
        if npm uninstall ${bundle_packages}
        then
            echo "${bundle_name} removed"
        else
            echo "ERROR: ${bundle_name} not removed"
            exit 1
        fi
    fi
}

install_one_bundle() {
    bundle_installed="$1"
    bundle_name="$2"
    bundle_packages="$3"
    additional_options="$4"
    if [ "${bundle_installed}" = "" ]; then
        echo ""
        echo "Installing ${bundle_name} bundle..."
        echo "npm install ${INSTALL_OPTIONS} ${additional_options} ${bundle_packages}"
        echo ""
        if npm install ${INSTALL_OPTIONS} ${additional_options} ${bundle_packages}
        then
            echo "${bundle_name} installed."
        else
            echo "ERROR: ${bundle_name} not installed."
            exit 1
        fi
    fi
}

uninstall_vite() {
    uninstall_one_bundle "${VITE_INSTALLED}" "Vite" "${VITE_PACKAGES}"
}

uninstall_webpack() {
    uninstall_one_bundle "${WEBPACK_INSTALLED}" "Webpack" "${WEBPACK_PACKAGES}"
}

uninstall_react_app_rewired() {
    uninstall_one_bundle "${REACT_APP_REWIRED_INSTALLED}" "React App Rewired" "${REACT_APP_REWIRED_PACKAGES}"
}

install() {
    if [ "${RUN_METHOD}" = "vite" ]; then
        uninstall_webpack
        uninstall_react_app_rewired
        install_one_bundle "${VITE_INSTALLED}" "Vite" "${VITE_PACKAGES}"
    elif [ "${RUN_METHOD}" = "webpack" ]; then
        uninstall_react_app_rewired
        uninstall_vite
        install_one_bundle "${WEBPACK_INSTALLED}" "Webpack" "${WEBPACK_PACKAGES}"
    else
        uninstall_webpack
        uninstall_vite
        install_one_bundle "${REACT_APP_REWIRED_INSTALLED}" "React App Rewired" "${REACT_APP_REWIRED_PACKAGES}" "--legacy-peer-deps"
    fi
}

uninstall() {
    if [ "${RUN_METHOD}" = "webpack" ]; then
        uninstall_webpack
    elif [ "${RUN_METHOD}" = "vite" ]; then
        uninstall_vite
    else
        uninstall_react_app_rewired
    fi
}

# Defaults

ACTION="$1"
if [ -z "${ACTION}" ]; then
    help
fi

RUN_METHOD="$2"
if [ "${RUN_METHOD}" = "" ]; then
    help
fi

RUN_LIB="$3"
if [ "${RUN_LIB}" = "" ]; then
    INSTALL_OPTIONS="--save-dev"
else
    INSTALL_OPTIONS="--save-peer --strict-peer-deps"
fi

REACT_APP_REWIRED_INSTALLED=$(perl -ne 'print $1 if /"react-app-rewired":\s*"([^"]*)"/' package.json)
VITE_INSTALLED=$(perl -ne 'print $1 if /"vite":\s*"([^"]*)"/' package.json)
WEBPACK_INSTALLED=$(perl -ne 'print $1 if /"webpack-dev-server":\s*"([^"]*)"/' package.json)

VITE_PACKAGES="vite @vitejs/plugin-react vite-plugin-require @tailwindcss/vite"
WEBPACK_PACKAGES="webpack webpack-cli webpack-dev-server html-webpack-plugin interpolate-html-plugin"
REACT_APP_REWIRED_PACKAGES="react-app-rewired react-scripts"

echo ""
echo "***********************************"
echo "** Run Method Dependency Manager **"
echo "***********************************"
echo ""
echo "ACTION = ${ACTION}"
echo "RUN_LIB = '${RUN_LIB}'"
echo "INSTALL_OPTIONS = '${INSTALL_OPTIONS}'"
echo "RUN_METHOD = ${RUN_METHOD}"
echo ""
echo "REACT_APP_REWIRED_INSTALLED = ${REACT_APP_REWIRED_INSTALLED}"
echo "VITE_INSTALLED = ${VITE_INSTALLED}"
echo "WEBPACK_INSTALLED = ${WEBPACK_INSTALLED}"
echo ""
echo "VITE_PACKAGES = ${VITE_PACKAGES}"
echo "WEBPACK_PACKAGES = ${WEBPACK_PACKAGES}"
echo "REACT_APP_REWIRED_PACKAGES = ${REACT_APP_REWIRED_PACKAGES}"
echo ""

if [ "${ACTION}" = "install" ]; then
    install
fi

if [ "${ACTION}" = "uninstall" ]; then
    uninstall
fi

echo ""
echo "Action: ${ACTION} | Run Method: ${RUN_METHOD} | Install Options: ${INSTALL_OPTIONS}"
echo ""
echo "Done!"
echo ""
