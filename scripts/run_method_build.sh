#!/bin/bash
# File: scripts/run_method_build.sh
# 2025-07-02 | CR
#
assign_static_dir_exists() {    
    export STATIC_DIR_EXISTS="0"
    if [ -f "${STATUS_FILE}" ]; then
        echo ""
        echo "Removing 'static' directory because status file exists: ${STATUS_FILE}"
        remove_symlinks
    else
        # Verify if the static directory is a symlink
        if [ -L "${REPO_BASEDIR}/public/static" ]; then
            echo ""
            echo "Removing 'static' directory because symlink exist..."
            remove_symlinks
        else
            # Verify if the static directory exists
            if [ -d "${REPO_BASEDIR}/public/static" ]; then
                echo ""
                echo "INFO: 'static' directory exists..."
                export STATIC_DIR_EXISTS="1"
            fi
        fi
    fi
}

create_symlinks() {
    echo "Calling: ${SCRIPTS_DIR}/build_copy_images.sh \"public\" \"${REPO_BASEDIR}\""
    sh "${SCRIPTS_DIR}/build_copy_images.sh" "public" "${REPO_BASEDIR}"

    echo "1" > "${STATUS_FILE}"

    if [ "${DEBUG}" = "1" ]; then
        echo ""
        echo "ls -la \"${REPO_BASEDIR}/public\""
        ls -la "${REPO_BASEDIR}/public"
        echo ""
        echo "ls -laR \"${REPO_BASEDIR}/public/static\""
        ls -laR "${REPO_BASEDIR}/public/static"
        echo ""
        echo "Press Enter to continue"
        read
    fi
}

remove_symlinks() {
    echo "Removing \"${REPO_BASEDIR}/public/static\""
    rm -rf "${REPO_BASEDIR}/public/static"
    rm "${STATUS_FILE}"
}

help() {
    echo ""
    echo "Usage: sh run_method_build.sh <action> <run-method> <enviroment>"
    echo ""
    echo "The action could be: build"
    echo "The run method could be: vite, webpack, react-scripts"
    echo "The enviroment is optional and can be:"
    echo "  blank, 'qa', 'staging' or 'dev': build for development"
    echo "  'prod': build for production"
    echo ""
    exit 1
}

run_build() {
    echo "Building React app... (${RUN_BUNDLER} / ${ENV_TYPE})"
    if [ "${ENV_TYPE}" = "prod" ]; then
        echo "Building for production..."
        if [ "${RUN_BUNDLER}" = "webpack" ]; then
            run_command="npx webpack --mode production"
        elif [ "${RUN_BUNDLER}" = "vite" ]; then
            run_command="npx vite build"
        else
            run_command="npx react-app-rewired build"
        fi
        # npm run build-prod
        if ! ${run_command}
        then
            ERROR_MSG="ERROR-010 running ${run_command}"
        fi
    else
        echo "Building for development (${ENV_TYPE})..."
        if [ "${RUN_BUNDLER}" = "webpack" ]; then
            run_command="npx webpack --mode development"
        elif [ "${RUN_BUNDLER}" = "vite" ]; then
            run_command="npx vite build"
        else
            run_command="npx react-app-rewired build"
        fi
        # npm run build-dev
        if ! ${run_command}
        then
            ERROR_MSG="ERROR-020 running ${run_command}"
        fi
    fi
}

REPO_BASEDIR="`pwd`"
SCRIPTS_DIR="$( cd -- "$(dirname "$BASH_SOURCE")" >/dev/null 2>&1 ; pwd -P )"

cd "${REPO_BASEDIR}"

echo ""
echo "-----------------------------"
echo "\$0: $0"
echo "-----------------------------"
echo "REPO_BASEDIR: ${REPO_BASEDIR}"
echo "SCRIPTS_DIR: ${SCRIPTS_DIR}"
echo "-----------------------------"
echo ""

set -o allexport; source ".env" ; set +o allexport ;

ACTION="$1"
if [ -z "${ACTION}" ]; then
    help
fi

RUN_BUNDLER="$2"
if [ "${RUN_BUNDLER}" = "" ]; then
    help
fi

ENV_TYPE="$3"
if [ "${ENV_TYPE}" = "" ]; then
    help
fi

DEBUG="$4"
if [ "${DEBUG}" = "" ]; then
    DEBUG="1"
fi

STATUS_FILE="${REPO_BASEDIR}/z_static_tmp_created.txt"

if [ "${ACTION}" = "build" ]; then
    assign_static_dir_exists
    if [ "${STATIC_DIR_EXISTS}" = "0" ]; then
        create_symlinks
    fi
    run_build
    if [ "${STATIC_DIR_EXISTS}" = "0" ]; then
        remove_symlinks
    fi
else
    echo "ERROR: Invalid action: ${ACTION}"
    exit 1
fi
