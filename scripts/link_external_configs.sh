#!/bin/bash
# link_external_configs.sh
# Link external configs directory to "src/configs" directory so the JSON configurations can be tested in GenericSuite FE Core.
# 2026-02-01 | CR

# Actions:
# create: Mirrors source JSON configs directory TO project (using rsync).
# push: Syncs project BACK TO source JSON configs directory (using rsync).
# diff: Compares project and source JSON configs directory.
# remove: Restores the original backup "src/configs_backup".

validations_and_assignments() {
    if [ "${TARGET_CONFIG_PATH}" = "" ]; then
        TARGET_CONFIG_PATH="${GIT_SUBMODULE_LOCAL_PATH_FRONTEND:-"src/configs"}"
    fi

    if [ "${TARGET_CONFIG_PATH}" = "" ]; then
        echo "ERROR: TARGET_CONFIG_PATH is not set"
        exit 1
    fi

    if [ "${SOURCE_CONFIG_PATH}" = "" ]; then
        echo "ERROR: SOURCE_CONFIG_PATH is not set"
        exit 1
    fi

    if [ "${LINK_EXT_ACTION}" = "" ]; then
        echo "ERROR: LINK_EXT_ACTION is not set. Options: create, remove"
        exit 1
    fi

    if [ ! -d "${SOURCE_CONFIG_PATH}" ]; then
        echo "ERROR: Directory '${SOURCE_CONFIG_PATH}' does not exist"
        exit 1
    fi

    if [ ! -d "${SOURCE_CONFIG_PATH}/frontend" ]; then
        echo "ERROR: Directory '${SOURCE_CONFIG_PATH}/frontend' does not exist"
        exit 1
    fi

    if [ ! -d "${SOURCE_CONFIG_PATH}/backend" ]; then
        echo "ERROR: Directory '${SOURCE_CONFIG_PATH}/backend' does not exist"
        exit 1
    fi
}

create_symlink() {
    if [ -d "${TARGET_CONFIG_PATH}" ]; then
        if [ ! -L "${TARGET_CONFIG_PATH}" ]; then
            echo "Directory ${TARGET_CONFIG_PATH} exists, moving to ${TARGET_CONFIG_PATH}_backup"
            if ! mv "${TARGET_CONFIG_PATH}" "${TARGET_CONFIG_PATH}_backup"
            then
                echo "ERROR: Failed to move directory ${TARGET_CONFIG_PATH}"
                exit 1
            fi
        else
            echo "Symbolic link ${TARGET_CONFIG_PATH} exists, removing it"
            rm "${TARGET_CONFIG_PATH}"
        fi
    fi

    echo "Syncing ${SOURCE_CONFIG_PATH} to ${TARGET_CONFIG_PATH}"
    mkdir -p "${TARGET_CONFIG_PATH}"
    # rsync -av --delete "${SOURCE_CONFIG_PATH}/" "${TARGET_CONFIG_PATH}/"
    if ! rsync -av --delete "${SOURCE_CONFIG_PATH}/" "${TARGET_CONFIG_PATH}/"
    then
        echo "ERROR: Failed to sync directory ${TARGET_CONFIG_PATH}"
        exit 1
    fi
    echo "Done"
}

remove_symlink() {
    if [ -d "${TARGET_CONFIG_PATH}" ]; then
        echo "Removing synced directory ${TARGET_CONFIG_PATH}"
        if ! rm -rf "${TARGET_CONFIG_PATH}"
        then
            echo "ERROR: Failed to remove directory ${TARGET_CONFIG_PATH}"
            exit 1
        fi
    fi

    if [ -d "${TARGET_CONFIG_PATH}_backup" ]; then
        echo "Backing up directory ${TARGET_CONFIG_PATH}_backup to ${TARGET_CONFIG_PATH}"
        if ! mv "${TARGET_CONFIG_PATH}_backup" "${TARGET_CONFIG_PATH}"
        then
            echo "ERROR: Failed to move directory ${TARGET_CONFIG_PATH}_backup"
            exit 1
        fi
        echo "Done"
    else
        echo "WARNING: Directory ${TARGET_CONFIG_PATH}_backup does not exist..."
    fi
}

push_changes() {
    if [ ! -d "${TARGET_CONFIG_PATH}" ]; then
        echo "ERROR: Target directory ${TARGET_CONFIG_PATH} does not exist"
        exit 1
    fi

    echo "Syncing (Pushing) ${TARGET_CONFIG_PATH} back to ${SOURCE_CONFIG_PATH}"
    # rsync -av --delete "${TARGET_CONFIG_PATH}/" "${SOURCE_CONFIG_PATH}/"
    if ! rsync -av --delete "${TARGET_CONFIG_PATH}/" "${SOURCE_CONFIG_PATH}/"
    then
        echo "ERROR: Failed to push changes back to ${SOURCE_CONFIG_PATH}"
        exit 1
    fi
    echo "Done"
}

compare_directories() {
    if [ ! -d "${TARGET_CONFIG_PATH}" ]; then
        echo "ERROR: Target directory ${TARGET_CONFIG_PATH} does not exist"
        exit 1
    fi

    echo "Comparing ${TARGET_CONFIG_PATH} with ${SOURCE_CONFIG_PATH}..."
    echo "---------------------------------------------------------"
    # -r: recursive, -q: brief (only report if files differ)
    # Use -u for a detailed diff if you prefer
    diff -rq "${TARGET_CONFIG_PATH}" "${SOURCE_CONFIG_PATH}"
    
    # Check if there are any differences
    if [ $? -eq 0 ]; then
        echo "No differences found."
    fi
    echo "---------------------------------------------------------"
}

read_confirmation() {
    echo ""
    echo "Are you sure you want proceed? (y/n): "
    read
    echo    # move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Canceling operation..."
        exit 0
    fi
}

create_confirmation() {
    echo "I will move '${TARGET_CONFIG_PATH}' to '${TARGET_CONFIG_PATH}_backup'"
    echo "and sync '${SOURCE_CONFIG_PATH}' to '${TARGET_CONFIG_PATH}' via rsync"
    read_confirmation
}

remove_confirmation() {
    echo "I will remove synced directory '${TARGET_CONFIG_PATH}'"
    echo "and move '${TARGET_CONFIG_PATH}_backup' to '${TARGET_CONFIG_PATH}'"
    read_confirmation
}

# Start

LINK_EXT_ACTION="$1"
SOURCE_CONFIG_PATH="$2"
TARGET_CONFIG_PATH="$3"

# Read environment variables from .env file
set -o allexport; source ".env" ; set +o allexport ;

echo ""
echo "Link External JSON Configs"
echo ""
echo "LINK_EXT_ACTION: ${LINK_EXT_ACTION}"
echo "SOURCE_CONFIG_PATH: ${SOURCE_CONFIG_PATH}"
echo "TARGET_CONFIG_PATH: ${TARGET_CONFIG_PATH:-${GIT_SUBMODULE_LOCAL_PATH_FRONTEND:-"src/configs"}}"
echo "GIT_SUBMODULE_LOCAL_PATH_FRONTEND: ${GIT_SUBMODULE_LOCAL_PATH_FRONTEND}"
echo ""

validations_and_assignments

if [ "${LINK_EXT_ACTION}" = "create" ]; then
    create_confirmation
    create_symlink
elif [ "${LINK_EXT_ACTION}" = "remove" ]; then
    remove_confirmation
    remove_symlink
elif [ "${LINK_EXT_ACTION}" = "push" ]; then
    echo "I will sync '${TARGET_CONFIG_PATH}' back to '${SOURCE_CONFIG_PATH}'"
    read_confirmation
    push_changes
elif [ "${LINK_EXT_ACTION}" = "diff" ]; then
    compare_directories
else
    echo "ERROR: Invalid action: ${LINK_EXT_ACTION}"
    echo "Options: create, remove, push, diff"
    exit 1
fi
