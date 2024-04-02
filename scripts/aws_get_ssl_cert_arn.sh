#!/bin/bash
# File: scripts/aws_get_ssl_cert_arn.sh
# 2024-04-01 | CR

get_ssl_cert_arn() {
    echo ""
    echo "NOTE: These 3 warnings '-i used with no filenames on the command line, reading from STDIN.' are normal..."
    domain_cleaned=$(echo $domain | perl -i -pe 's|https:\/\/||' | perl -i -pe 's|http:\/\/||' | perl -i -pe 's|:.*||')

    echo ""
    echo "Fetching ACM Certificate ARN for '${domain_cleaned}'..."
    echo "(Originally: '${domain})"
    # ACM_CERTIFICATE_ARN=$(aws acm list-certificates --region ${AWS_REGION} --output text --query "CertificateSummaryList[?DomainName=='${APP_FE_URL}'].CertificateArn | [0]")
    ACM_CERTIFICATE_ARN=$(aws acm list-certificates --output text --query "CertificateSummaryList[?DomainName=='${domain_cleaned}'].CertificateArn | [0]")

    echo ""
    echo "[${domain_cleaned}] ACM Certificate ARN: ${ACM_CERTIFICATE_ARN}"

    if [[ "${ACM_CERTIFICATE_ARN}" = "" || "${ACM_CERTIFICATE_ARN}" = "None" || "${ACM_CERTIFICATE_ARN}" = "null" || "${ACM_CERTIFICATE_ARN}" = "NULL" || "${ACM_CERTIFICATE_ARN}" = "Null" ]]; then
        ACM_CERTIFICATE_ARN=""
        echo "ERROR: ACM Certificate ARN not found for '${domain_cleaned}'"
    fi
}

REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

UPDATE_BUILD="1"

ENV_FILESPEC=""
if [ -f "${REPO_BASEDIR}/.env" ]; then
    ENV_FILESPEC="${REPO_BASEDIR}/.env"
else
    ERROR_MSG="ERROR .env file doesn't exist"
fi
if [ "${ERROR_MSG}" = "" ]; then
    if [ "${ENV_FILESPEC}" != "" ]; then
        set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    domain="${APP_FE_URL}"
    get_ssl_cert_arn

    domain="${REACT_APP_API_URL}"
    get_ssl_cert_arn
fi

echo ""
if [ "${ERROR_MSG}" = "" ]; then
    echo "Done..."
else
    echo "ERROR: ${ERROR_MSG}"
fi
echo ""
