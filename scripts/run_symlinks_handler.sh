#!/bin/bash
# run_symlinks_handler.sh
# 2025-04-28 | CR

REPO_BASEDIR="`pwd`"
if [ ! -f "${REPO_BASEDIR}/package.json" ]; then
    REPO_BASEDIR="`pwd`/.."
fi

if [ ! -f "${REPO_BASEDIR}/package.json" ]; then
    echo "${REPO_BASEDIR}/package.json not found"
    exit 1
fi

create_symlinks() {
    if [ ! -L "${REPO_BASEDIR}/public/static" ]; then
        echo ""
        echo "Creating symlink: ${REPO_BASEDIR}/public/static/media"
        echo ""
        if ! ln -s "${REPO_BASEDIR}/build/static" "${REPO_BASEDIR}/public/static"
        then
            echo ""
            echo "ERROR running: ln -s \"${REPO_BASEDIR}/build/static\" \"${REPO_BASEDIR}/public/static\""
            exit 1
        fi
    fi
}

remove_symlinks() {
    if [ -L "${REPO_BASEDIR}/public/static" ]; then
        echo ""
        echo "Removing symlink: ${REPO_BASEDIR}/public/static"
        echo ""
        if ! rm "${REPO_BASEDIR}/public/static"
        then
            echo ""
            echo "ERROR removing symlink: ${REPO_BASEDIR}/public/static"
            exit 1
        fi
    fi
}

if [ "${1}" = "create" ]; then
    create_symlinks
elif [ "${1}" = "remove" ]; then
    remove_symlinks
else
    echo "Usage: ${0} [create|remove]"
    exit 1
fi
