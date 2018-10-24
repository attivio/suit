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
npm version $VERSION_TYPE
#git commit --no-verify && \
echo "Not pushing yet..."
#git push
echo "Updated SUIT version. Run 'npm run fullbuild' and 'npm run publish' to add the new version of the library to the NPM repo."
