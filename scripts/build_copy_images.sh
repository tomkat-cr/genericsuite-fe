#!/bin/bash
# File: scripts/build_copy_images.sh
#
# 2024-03-16 | CR
#
TARGET_DIR="$1"
if [ "${TARGET_DIR}" = "" ]; then
    TARGET_DIR="build"
fi

BASE_DIR="$2"
if [ "${BASE_DIR}" = "" ]; then
    BASE_DIR="."
fi

echo ""
echo "--------------------------------------"
echo "\$0: $0"
echo "--------------------------------------"
echo "Copying images to ${TARGET_DIR}/static/media directory..."
echo "from: ${BASE_DIR}"
echo "--------------------------------------"
echo ""

mkdir -p "${BASE_DIR}/${TARGET_DIR}/static/media"

if [ -d "${BASE_DIR}/src/lib/images" ]; then
    cp "${BASE_DIR}/src/lib/images/"* "${BASE_DIR}/${TARGET_DIR}/static/media"
fi
if [ -d "${BASE_DIR}/src/lib/_images" ]; then
    cp "${BASE_DIR}/src/lib/_images/"* "${BASE_DIR}/${TARGET_DIR}/static/media"
fi
if [ -d "${BASE_DIR}/node_modules/genericsuite/src/lib/images" ]; then
    cp "${BASE_DIR}/node_modules/genericsuite/src/lib/images/"* "${BASE_DIR}/${TARGET_DIR}/static/media"
fi
if [ -d "${BASE_DIR}/node_modules/genericsuite-ai/src/lib/images" ]; then
    cp "${BASE_DIR}/node_modules/genericsuite-ai/src/lib/images/"* "${BASE_DIR}/${TARGET_DIR}/static/media"
fi
if [ -d "${BASE_DIR}/src/images" ]; then
    cp "${BASE_DIR}/src/images/"* "${BASE_DIR}/${TARGET_DIR}/static/media"
fi
if [ -d "${BASE_DIR}/src/_images" ]; then
    cp "${BASE_DIR}/src/_images/"* "${BASE_DIR}/${TARGET_DIR}/static/media"
fi

echo ""
echo "Done!"
