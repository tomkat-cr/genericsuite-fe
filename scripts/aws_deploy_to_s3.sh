#!/bin/bash
# File: scripts/aws_deploy_to_s3.sh
# 2023-07-17 | CR

REPO_BASEDIR="`pwd`"
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
cd "${REPO_BASEDIR}"

UPDATE_BUILD="1"

ENV_FILESPEC=""
if [ -f "${REPO_BASEDIR}/.env" ]; then
    ENV_FILESPEC="${REPO_BASEDIR}/.env"
fi
if [ "${ENV_FILESPEC}" != "" ]; then
    set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
fi

if [ "${AWS_REGION}" = "" ]; then
    echo "ERROR: AWS_REGION environment variable not defined"
    exit 1
fi

if [ "${AWS_S3_BUCKET_NAME}" = "" ]; then
    echo "ERROR: AWS_S3_BUCKET_NAME environment variable not defined"
    exit 1
fi

if [ "${GITHUB_USERNAME}" = "" ]; then
    echo "ERROR: GITHUB_USERNAME environment variable not defined"
    exit 1
fi

if [ "${GITHUB_REPONAME}" = "" ]; then
    echo "ERROR: GITHUB_REPONAME environment variable not defined"
    exit 1
fi

# if [ "${REACT_APP_APP_NAME}" = "" ]; then
#     echo "ERROR: REACT_APP_APP_NAME environment variable not defined"
#     exit 1
# fi
# export APP_NAME_LOWERCASE=$(echo ${REACT_APP_APP_NAME} | tr '[:upper:]' '[:lower:]')
# if [ "${APP_LOCAL_DOMAIN_NAME}" = "" ]; then
#     export APP_LOCAL_DOMAIN_NAME="app.${APP_NAME_LOWERCASE}.local"
# fi

export REACT_APP_VERSION=`cat "version.txt"`

# Name of the S3 bucket
if [ "${ERROR_MSG}" = "" ]; then
    if [ "${AWS_S3_BUCKET_NAME}" = "" ];then
        ERROR_MSG="AWS_S3_BUCKET_NAME is not set"
    fi
fi
# Region of the S3 bucket
if [ "${ERROR_MSG}" = "" ]; then
    if [ "${AWS_REGION}" = "" ];then
        ERROR_MSG="AWS_REGION is not set"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    BUCKET_NAME="${AWS_S3_BUCKET_NAME}"
    if [ "${AWS_PROFILE}" = "" ];then
        AWS_PROFILE="default"
    fi
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --output json --no-paginate | jq -r '.Account')
    if [ "${AWS_ACCOUNT_ID}" = "" ];then
        ERROR_MSG="AWS_ACCOUNT_ID could not be retrieved"
    fi
fi

# Deploy to S3
if [ "${ERROR_MSG}" = "" ]; then
    echo "Verifying AWS S3 bucket ${AWS_S3_BUCKET_NAME} existence..."
    S3_BUCKET_NOT_FOUND=$(aws s3api head-bucket --bucket ${AWS_S3_BUCKET_NAME}  --region ${AWS_REGION} 2>&1 | grep -c 'Not Found')
    # if ! aws s3api head-bucket --bucket ${AWS_S3_BUCKET_NAME} --region ${AWS_REGION} --output text
    echo "S3_BUCKET_NOT_FOUND: ${S3_BUCKET_NOT_FOUND}"
    if [ "${S3_BUCKET_NOT_FOUND}" = "1" ];then

        echo "Creating the AWS S3 bucket ${AWS_S3_BUCKET_NAME}..."
        if [ "${AWS_REGION}" = "us-east-1" ]; then
            if ! aws s3api create-bucket --bucket ${AWS_S3_BUCKET_NAME} --region ${AWS_REGION} --acl bucket-owner-full-control --output text
            then
                ERROR_MSG="ERROR could not create the bucket [1] - Region: ${AWS_REGION}"
            fi
        else
            if ! aws s3api create-bucket --bucket ${AWS_S3_BUCKET_NAME} --region ${AWS_REGION} --create-bucket-configuration LocationConstraint=${AWS_REGION} --acl bucket-owner-full-control --output text
            then
                ERROR_MSG="ERROR could not create the bucket [2] - Region: ${AWS_REGION}"
            fi
        fi
    else
        echo "AWS S3 bucket ${AWS_S3_BUCKET_NAME} exists..."
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    echo "Creating/verifying the AWS Cloudfront distribution..."

    # Get CloudFront distribution ID
    echo "Getting CloudFront distribution ID..."
    DIST_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[0].DomainName=='${BUCKET_NAME}.s3.amazonaws.com'].{Id:Id}[0]" \
    --output text)
    echo "CloudFront Distribution ID: $DIST_ID"

    # Verify existence of CloudFront distribution ID
    echo "Verifying CloudFront distribution ID..."
    if [ "${DIST_ID}" != "" ]; then
        aws cloudfront get-distribution --id ${DIST_ID} --no-paginate > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "CloudFront Distribution ${DIST_ID} exists"
        else
            echo "CloudFront Distribution ${DIST_ID} does not exist"
            DIST_ID=""
        fi
    fi

    # Creating CloudFront distribution
    if [ "${DIST_ID}" = "" ]; then
        echo "Creating CloudFront distribution..."
        DIST_ID=$(aws cloudfront create-distribution \
        --origin-domain-name ${BUCKET_NAME}.s3.amazonaws.com \
        --default-root-object index.html \
        --output text \
        --query 'Distribution.Id')
    fi
    echo "CloudFront distribution ID: $DIST_ID"

    # Get the OAI associated with the distribution:
    echo "Getting the OAI associated with the distribution..."
    OAI_ID=$(aws cloudfront get-distribution --id ${DIST_ID} --query 'Distribution.ActiveTrustedSigners.Enabled' --output text)
    echo "OAI ID: $OAI_ID"

    if [ "${OAI_ID}" = "False" ]; then
        echo "OAI is not enabled. Enabling OAI..."
        OAI_ID=$(aws cloudfront create-cloud-front-origin-access-identity --cloud-front-origin-access-identity-config CallerReference=caller-ref-${BUCKET_NAME},Comment=comment-${BUCKET_NAME} --query 'CloudFrontOriginAccessIdentity.Id' --output text)
        echo "OAI ID: $OAI_ID"
        if [ "${OAI_ID}" = "" ]; then
            ERROR_MSG="ERROR creating OAI"
        fi
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    # Associate the OAI with the distribution:
    echo "Verifying association of OAI with the distribution..."            

    OAI_VERIF=$(aws cloudfront get-cloud-front-origin-access-identity --id ${OAI_ID} --output text)
    echo "OAI_VERIF: $OAI_VERIF"

    OAI_VERIF_CONFIG=$(aws cloudfront get-cloud-front-origin-access-identity-config --id ${OAI_ID} --output text)
    echo "OAI_VERIF_CONFIG: $OAI_VERIF_CONFIG"

    if [ "${OAI_VERIF_CONFIG}" = "" ]; then
        ERROR_MSG="ERROR associating the OAI with the distribution"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    # Enable ACLs for the bucket
    echo "Enable ACLs for the bucket | put-bucket-acl | --acl bucket-owner-full-control"
    aws s3api put-bucket-acl --bucket $BUCKET_NAME --acl bucket-owner-full-control --profile $AWS_PROFILE  --output text

    # Set ACLs for the bucket owner
    echo "Set ACLs for the bucket owner | put-bucket-acl | --grant-full-control"
    aws s3api put-object-acl --bucket $BUCKET_NAME --grant-full-control id=$AWS_ACCOUNT_ID --profile $AWS_PROFILE --output text

    # Set ACLs for Everyone (public access)
    echo "Set ACLs for Everyone (public access) | put-bucket-acl | --grant-read-acp..."
    aws s3api put-object-acl --bucket $BUCKET_NAME --grant-read-acp uri=http://acs.amazonaws.com/groups/global/AllUsers --profile $AWS_PROFILE --output text
    echo "Set ACLs for Everyone (public access) | put-bucket-acl | --grant-listing..."
    aws s3api put-object-acl --bucket $BUCKET_NAME --grant-listing uri=http://acs.amazonaws.com/groups/global/AllUsers --profile $AWS_PROFILE --output text

    echo "ACL enabled Object Ownership Permissions set successfully!"
fi

if [ "${ERROR_MSG}" = "" ]; then
    # Add permissions to the S3 bucket policy to allow access from the OAI:
    echo "Adding permissions to the S3 bucket policy to allow access from the OAI..."
    S3_BUCKET_POLICY="{
\"Version\":\"2012-10-17\",
\"Statement\":[
    {
        \"Sid\":\"AllowCloudFrontOAIAccess\",
        \"Effect\":\"Allow\",
        \"Principal\":{\"AWS\":\"arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${OAI_ID}\"},
        \"Action\":\"s3:GetObject\",
        \"Resource\":\"arn:aws:s3:::${BUCKET_NAME}/*\"
    },
    {
        \"Sid\":\"PublicReadGetObject\",
        \"Effect\":\"Allow\",
        \"Principal\":\"*\",
        \"Action\":\"s3:GetObject\",
        \"Resource\":\"arn:aws:s3:::${BUCKET_NAME}/*\"
    }
]
}"
    echo "S3_BUCKET_POLICY: $S3_BUCKET_POLICY"
    BUCKET_POLICY_RESULT=$(aws s3api put-bucket-policy --bucket ${BUCKET_NAME} --policy "${S3_BUCKET_POLICY}" --output text)
    if [ $? -eq 0 ]; then
    # if ! aws s3api put-bucket-policy --bucket ${BUCKET_NAME} --policy "${S3_BUCKET_POLICY}" 
    # then
        echo "S3 bucket policy updated"
        echo "BUCKET_POLICY_RESULT: $BUCKET_POLICY_RESULT"

        echo $(aws s3api get-bucket-policy --bucket ${BUCKET_NAME} --output text)
        echo $(aws cloudfront get-distribution-config --id ${DIST_ID} --output text)
    else
        ERROR_MSG="ERROR running aws s3api put-bucket-policy --bucket ${BUCKET_NAME} --policy ${S3_BUCKET_POLICY}"
        echo "${ERROR_MSG}"
        read -p "Type 'Y' and press Enter to continue, other value to cancel..." var
        if [[ "$var" = "Y" || "$var" = "y" ]]; then
            echo "Continuing..."
            ERROR_MSG=""
        else
            echo "Exiting..."
        fi
    fi    
fi

if [ "${ERROR_MSG}" = "" ]; then

    # Get CloudFront domain name
    echo "Getting CloudFront domain name..."
    DOMAIN_NAME=$(aws cloudfront get-distribution --id ${DIST_ID} --query 'Distribution.DomainName' --output text)
    echo "CloudFront domain name: $DOMAIN_NAME"
fi

if [ "${ERROR_MSG}" = "" ]; then

    echo "Updating package.json homepage with cloudfront domain..."
    if ! perl -i -pe"s|\"homepage\": \"https:\/\/${GITHUB_USERNAME}.github.io\/${GITHUB_REPONAME}\/\"|\"homepage\": \"https:\/\/$DOMAIN_NAME\"|g" package.json
    then
        ERROR_MSG='ERROR updating package.json homepage with cloudfront domain $DOMAIN_NAME'
    else
        echo "package.json homepage updated"
    fi
fi

# Build the ReactJS project
if [ "${ERROR_MSG}" = "" ]; then
    if [ "${UPDATE_BUILD}" = "1" ]; then
        echo "Building React app..."
        if [ "$1" = "prod" ]; then
            echo "Building for production..."
            if ! npm run build-prod
            then
                ERROR_MSG="ERROR running npm run build-prod"
            fi
        else
            echo "Building for development..."
            if ! npm run build
            then
                ERROR_MSG="ERROR running npm run build"
            fi
        fi
        if [ "${ERROR_MSG}" = "" ]; then
            # Copy images to build/static/media directory
            if ! source ${SCRIPTS_DIR}/build_copy_images.sh
            then
                ERROR_MSG="ERROR running: source ${SCRIPTS_DIR}/build_copy_images.sh"
            fi
        fi
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    if [ "${UPDATE_BUILD}" = "1" ]; then
        echo "Deploying to AWS S3..."
        if ! aws s3 sync build s3://${BUCKET_NAME} --acl bucket-owner-full-control --delete --region ${AWS_REGION} --output text
        then
            ERROR_MSG="ERROR running aws s3 sync build/ s3://${BUCKET_NAME} --acl bucket-owner-full-control --delete --region ${AWS_REGION} --output text"
        fi
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then

    echo "Updating package.json homepage (Restore)..."
    if ! perl -i -pe"s|\"homepage\": \"https:\/\/$DOMAIN_NAME\"|\"homepage\": \"https:\/\/${GITHUB_USERNAME}.github.io\/${GITHUB_REPONAME}\/\"|g" package.json
    then
        ERROR_MSG="ERROR running perl -i -pe's|\"homepage\": \"https:\/\/$DOMAIN_NAME\/\"|\"homepage\": \"https:\/\/${GITHUB_USERNAME}.github.io\/${GITHUB_REPONAME}\/\"|g' package.json"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    # Invalidate CloudFront cache
    echo "Invalidating CloudFront cache..."
    CLOUDFRONT_CREATE_INVALIDATION_RESULT=$(aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*")
    if [ $? -eq 0 ]; then
        echo "Command result: $?"
        echo "CLOUDFRONT_CREATE_INVALIDATION_RESULT: $CLOUDFRONT_CREATE_INVALIDATION_RESULT"
    else
    # if ! aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
    # then
        ERROR_MSG='ERROR running aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"'
    fi
fi

echo ""
if [ "${ERROR_MSG}" = "" ]; then
    echo "Deployment complete."
else
    echo "ERROR: ${ERROR_MSG}"
fi
echo ""
