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

sh ${BACKEND_PATH}/scripts/create_local_ssl_certs.sh ${APP_LOCAL_DOMAIN_NAME}
