#!/bin/bash
# File: scripts/build_copy_images.sh
#
# 2024-03-16 | CR
#
echo "Copying images to build/static/media directory..."
echo "from: $(pwd)"
echo ""

mkdir -p ./build/static/media

if [ -d ./src/lib/images ]; then
    cp ./src/lib/images/* ./build/static/media
fi
if [ -d ./src/lib/_images ]; then
    cp ./src/lib/_images/* ./build/static/media
fi
if [ -d ./node_modules/genericsuite/src/lib/images ]; then
    cp ./node_modules/genericsuite/src/lib/images/* ./build/static/media
fi
if [ -d ./node_modules/genericsuite-ai/src/lib/images ]; then
    cp ./node_modules/genericsuite-ai/src/lib/images/* ./build/static/media
fi
if [ -d ./src/images ]; then
    cp ./src/images/* ./build/static/media
fi
if [ -d ./src/_images ]; then
    cp ./src/_images/* ./build/static/media
fi

echo ""
echo "Done!"
