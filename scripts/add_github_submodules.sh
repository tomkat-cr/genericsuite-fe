#!/bin/sh
# File: scripts/add_github_submodules.sh
# 2023-07-21 | CR
#
ERROR_MSG=""

REPO_BASEDIR="`pwd`"

ENV_FILESPEC=""
if [ -f "${REPO_BASEDIR}/.env" ]; then
    ENV_FILESPEC="${REPO_BASEDIR}/.env"
fi
if [ "$ENV_FILESPEC" != "" ]; then
    set -o allexport; source ${ENV_FILESPEC}; set +o allexport ;
fi

if [ "${ERROR_MSG}" = "" ]; then
    if [ "${GIT_SUBMODULE_URL}" = "" ];then
        ERROR_MSG="GIT_SUBMODULE_URL is not set"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    if [ "${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}" = "" ];then
        ERROR_MSG="GIT_SUBMODULE_LOCAL_PATH_FRONTEND is not set"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    if [ "$1" != "--force" ]; then
        if ! git config --global url.https://github.com/.insteadOf git://github.com/
        then
            ERROR_MSG="Failed to set git config"
        fi
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    echo ""
    echo "Repo base dir: ${REPO_BASEDIR}"
    if ! cd "${REPO_BASEDIR}"
    then
        ERROR_MSG="Failed to cd into: ${REPO_BASEDIR}"
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    if [ "$1" = "--force" ]; then
        echo ""
        echo "FORCING Adding submodule: ${GIT_SUBMODULE_URL}"
        echo "To: ${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        echo ""
        echo "Running: git submodule add '${GIT_SUBMODULE_URL}' '${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}'"
        git submodule add "${GIT_SUBMODULE_URL}" "${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        echo ""
        echo "Running: git submodule init"
        git submodule init
        echo ""
        echo "Running: git submodule update --recursive --remote --jobs 8"
        git submodule update --recursive --remote --jobs 8
        echo ""
        echo "Running: git submodule sync"
        git submodule sync
        echo ""
        echo "Running: git submodule status"
        git submodule status
        echo ""
        echo "FINISHED running the git submodule --force"
        echo ""
    fi
fi
if [ "${ERROR_MSG}" = "" ]; then
    if [ ! -d "${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}" ]; then
        echo ""
        echo "Adding submodule: ${GIT_SUBMODULE_URL}"
        echo "To: ${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        echo ""
        echo "Running: git submodule add '${GIT_SUBMODULE_URL}' '${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}'"
        if ! git submodule add "${GIT_SUBMODULE_URL}" "${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        then
            ERROR_MSG="Failed to add submodule: ${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        else
            echo "Running: git submodule init"
            if ! git submodule init
            then
                ERROR_MSG="Failed to init submodules"
            else
                echo "Running: git submodule update"
                if ! git submodule update
                then
                    ERROR_MSG="Failed to update submodules"
                fi
            fi
        fi
    else
        if ! cd "${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        then
            ERROR_MSG="Failed to cd into: ${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
        else
            echo "Updating submodule: ${GIT_SUBMODULE_URL}"
            echo "In: ${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
            echo ""
            echo ">> Current directory: `pwd`"
            echo ""

            echo "Running: git fetch"
            if ! git fetch
            then
                ERROR_MSG="${ERROR_MSG}, Failed to fetch"
            fi

            # echo "Running: git checkout origin/main"
            # if ! git checkout origin/main
            # then
            #     ERROR_MSG="${ERROR_MSG}, Failed to git checkout origin/main"
            # fi

            echo "Running: git submodule init"
            if ! git submodule init
            then
                ERROR_MSG="${ERROR_MSG}, 'git submodule init' Failed"
            fi

            echo "Running: git submodule sync"
            if ! git submodule sync
            then
                ERROR_MSG="${ERROR_MSG}, 'git submodule sync' Failed"
            fi

            echo "Running: git pull --tags origin main"
            if ! git pull --tags origin main
            then
                ERROR_MSG="${ERROR_MSG}, 'git pull --tags origin main' Failed"
            fi

            echo "Running: git pull --recurse-submodules"
            if ! git pull --recurse-submodules
            then
                ERROR_MSG="${ERROR_MSG}, 'git pull --recurse-submodules' Failed"
            fi

            echo "Running: git submodule update --remote --recursive"
            if ! git submodule update --remote --recursive
            then
                ERROR_MSG="${ERROR_MSG}, 'git submodule update --remote --recursive' Failed"
            fi
        fi
    fi
fi

if [ "${ERROR_MSG}" = "" ]; then
    echo "SUCCESS"
else
    echo "ERROR: ${ERROR_MSG}"
fi
