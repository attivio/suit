#!/bin/bash

# Script to update the version of the SUIT library
# The local repository must be free of changes in order for this to
# work.

# If no parameter is passed, assume we're updating the patch version
VERSION_TYPE=$1
if [ -z "$VERSION_TYPE" ]
  then
    VERSION_TYPE="patch"
fi
git pull && \
npm version $VERSION_TYPE --commit-hooks false --no-git-tag-version && \
git add . && \
git commit -m "Updaing $VERSION_TYPE version" --no-verify && \
git push && \
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g') && \
echo "Updated SUIT version to $PACKAGE_VERSION. Run  'npm run publishlib' to build the new version of the library and add it to the NPM repo."
