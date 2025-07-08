#!/bin/bash
# run_change_module_setting.sh
# 2025-04-28 | CR

REPO_BASEDIR="`pwd`"
if [ ! -f "${REPO_BASEDIR}/package.json" ]; then
    REPO_BASEDIR="`pwd`/.."
fi

if [ ! -f "${REPO_BASEDIR}/package.json" ]; then
    echo "${REPO_BASEDIR}/package.json not found"
    exit 1
fi

turn_off_module() {
    echo "Turn off module..."
    perl -i -pe"s|\"type\": \"module\"|\"type1\": \"module\"|g" "${REPO_BASEDIR}/package.json"
    perl -i -pe"s|\"main\":|\"main1\":|g" "${REPO_BASEDIR}/package.json"
    perl -i -pe"s|\"types\":|\"types1\":|g" "${REPO_BASEDIR}/package.json"
    perl -i -pe"s|\"module\":|\"module1\":|g" "${REPO_BASEDIR}/package.json"
}

turn_on_module() {
    echo "Turn on module..."
    perl -i -pe"s|\"type1\": \"module\"|\"type\": \"module\"|g" "${REPO_BASEDIR}/package.json"
    perl -i -pe"s|\"main1\":|\"main\":|g" "${REPO_BASEDIR}/package.json"
    perl -i -pe"s|\"types1\":|\"types\":|g" "${REPO_BASEDIR}/package.json"
    perl -i -pe"s|\"module1\":|\"module\":|g" "${REPO_BASEDIR}/package.json"
}

if [ "${1}" = "off" ]; then
    turn_off_module
elif [ "${1}" = "on" ]; then
    turn_on_module
else
    echo "Usage: ${0} [off|on]"
    exit 1
fi

exit 0
