#!/bin/bash
# File: scripts/create_ssl_certs.sh
# 2024-02-20 | CR

set -o allexport; source .env; set +o allexport ;

if [ "${BACKEND_PATH}" = "" ]; then
    echo "ERROR: BACKEND_PATH environment variable not defined"
    exit 1
fi
if [ "${APP_LOCAL_DOMAIN_NAME}" = "" ]; then
    echo "ERROR: APP_LOCAL_DOMAIN_NAME environment variable not defined"
    exit 1
fi

export APP_NAME="${REACT_APP_APP_NAME}"
export FRONTEND_PATH="$(pwd)"
if [ "$1" = "create" ]; then
    sh ${BACKEND_PATH}/node_modules/genericsuite-be-scripts/scripts/local_ssl_certs_creation.sh ${APP_LOCAL_DOMAIN_NAME} ${BACKEND_PATH}
elif [ "$1" = "copy" ]; then
    sh ${BACKEND_PATH}/node_modules/genericsuite-be-scripts/scripts/local_ssl_certs_copy.sh ${APP_LOCAL_DOMAIN_NAME} ${FRONTEND_PATH} ${BACKEND_PATH}
else
    echo "Usage: ${0} [create|copy]"
    exit 1
fi
