#!/bin/bash
# File: scripts/change_env_be_endpoint.sh
# 2023-07-17 | CR

REPO_BASEDIR="`pwd`"
ERROR_MSG=""

ENV_FILESPEC=""
if [ -f "${REPO_BASEDIR}/.env" ]; then
    ENV_FILESPEC="${REPO_BASEDIR}/.env"
fi
if [ "${ENV_FILESPEC}" != "" ]; then
    set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
fi

# Name of the S3 bucket
if [ "${ERROR_MSG}" = "" ]; then
    if [ "$1" = "" ];then
        ERROR_MSG="First parameter must be: dev, qa, staging, or prod"
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

    SOURCE_ENV_VARNAME="REACT_APP_API_URL_${ENV_UPPERCASE}"
    SOURCE_ENV_VARNAME_VALUE="${!SOURCE_ENV_VARNAME}"

    echo "Updating REACT_APP_API_URL variable in .env file from: ${ENV_UPPERCASE} ..."
    echo "Current REACT_APP_API_URL value: ${REACT_APP_API_URL}"
    echo "New value from ${SOURCE_ENV_VARNAME}: ${SOURCE_ENV_VARNAME_VALUE}"
    echo "Backing up .env file to ${ENV_BKP_FILENAME}..."

    cp .env .env.`date +%Y-%m-%d`.bak

    if ! perl -i -pe"s|^REACT_APP_API_URL=.*|REACT_APP_API_URL=${SOURCE_ENV_VARNAME_VALUE}|" .env
    then
        ERROR_MSG='ERROR updating .env file'
    else
        echo "Refreshing environment variables from the .env file..."
        set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then

    SOURCE_ENV_VARNAME="AWS_S3_BUCKET_NAME_${ENV_UPPERCASE}"
    SOURCE_ENV_VARNAME_VALUE="${!SOURCE_ENV_VARNAME}"

    echo "Updating AWS_S3_BUCKET_NAME variable in .env file from: ${ENV_UPPERCASE} ..."
    echo "Current AWS_S3_BUCKET_NAME value: ${AWS_S3_BUCKET_NAME}"
    echo "New value from ${SOURCE_ENV_VARNAME}: ${SOURCE_ENV_VARNAME_VALUE}"
    echo "Backing up .env file to ${ENV_BKP_FILENAME}..."

    cp .env .env.`date +%Y-%m-%d`.bak

    if ! perl -i -pe"s|^AWS_S3_BUCKET_NAME=.*|AWS_S3_BUCKET_NAME=${SOURCE_ENV_VARNAME_VALUE}|" .env
    then
        ERROR_MSG='ERROR updating .env file'
    else
        echo "Refreshing environment variables from the .env file..."
        set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
    fi
fi

echo ""
if [ "${ERROR_MSG}" = "" ]; then
    echo "Done..."
else
    echo "ERROR: ${ERROR_MSG}"
fi
echo ""
