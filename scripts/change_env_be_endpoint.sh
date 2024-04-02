#!/bin/bash
# File: scripts/change_env_be_endpoint.sh
# 2023-07-17 | CR

replace_var_in_dot_env() {
    echo ""
    SOURCE_ENV_VARNAME="${varname}_${ENV_UPPERCASE}"
    SOURCE_ENV_VARNAME_VALUE="${!SOURCE_ENV_VARNAME}"
    echo "Updating ${target_varname} variable from ${SOURCE_ENV_VARNAME} in .env file for: ${ENV_UPPERCASE} ..."
    echo "Current ${target_varname} value: ${!target_varname}"
    echo "New value from ${SOURCE_ENV_VARNAME}: ${SOURCE_ENV_VARNAME_VALUE}"
    if ! perl -i -pe"s|^${target_varname}=.*|${target_varname}=${SOURCE_ENV_VARNAME_VALUE}|" ${ENV_FILESPEC}
    then
        ERROR_MSG='ERROR updating .env file [${target_varname} / ${varname}]'
    fi
}

REPO_BASEDIR="`pwd`"
ERROR_MSG=""

ENV_FILESPEC=""
if [ -f "${REPO_BASEDIR}/.env" ]; then
    ENV_FILESPEC="${REPO_BASEDIR}/.env"
else
    ERROR_MSG="ERROR .env file doesn't exist"
fi

if [ "${ERROR_MSG}" = "" ]; then
    set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
fi

# Name of the S3 bucket
if [ "${ERROR_MSG}" = "" ]; then
    if [ "$1" = "" ];then
        ERROR_MSG="First parameter must be: dev, qa, staging, demo or prod"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    ENV="${1}"
    echo ""
    echo "ENV: ${ENV}"

    # ENV_UPPERCASE=${ENV^^}
    ENV_UPPERCASE=$(echo $ENV | tr '[:lower:]' '[:upper:]')
    echo "ENV_UPPERCASE: ${ENV_UPPERCASE}"
    echo ""
fi

if [ "${ERROR_MSG}" = "" ]; then
    ENV_BKP_FILENAME=".env.`date +%Y-%m-%d`.bak"
    echo "Backup .env file to ${ENV_BKP_FILENAME}..."
    if ! cp .env ${ENV_BKP_FILENAME}
    then
        ERROR_MSG='ERROR doing the .env backup'
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    target_varname="REACT_APP_API_URL"
    varname="APP_API_URL"
    replace_var_in_dot_env
fi

if [ "${ERROR_MSG}" = "" ]; then
    target_varname="APP_FE_URL"
    varname="APP_FE_URL"
    replace_var_in_dot_env
fi

if [ "${ERROR_MSG}" = "" ]; then
    target_varname="AWS_S3_BUCKET_NAME"
    varname="AWS_S3_BUCKET_NAME"
    replace_var_in_dot_env
fi

if [ "${ERROR_MSG}" = "" ]; then
    echo ""
    echo "Refreshing environment variables from the .env file..."
    set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;

    echo ""
    echo "Final values:"
    echo ""
    echo "REACT_APP_API_URL: ${REACT_APP_API_URL}"
    echo "APP_FE_URL: ${APP_FE_URL}"
    echo "AWS_S3_BUCKET_NAME: ${AWS_S3_BUCKET_NAME}"
fi

echo ""
if [ "${ERROR_MSG}" = "" ]; then
    echo "Done..."
else
    echo "ERROR: ${ERROR_MSG}"
fi
echo ""
