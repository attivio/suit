#!/bin/bash

# Script to publish the SUIT library to NPM. Will also tag the
# repositoy with information about the new build.
# The user must be logged into NPM in order to do this

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

TAG_NAME="Published version $PACKAGE_VERSION"

echo "Going to build and publish version $PACKAGE_VERSION of the SUIT library."

# Try a git pull first to make sure that there are no un-checked-in changes
git pull && \
echo "Building..." && \
npm run fullbuild && \
echo "Publishing..." && \
npm publish && \
echo "Tagging..." && \
git tag -a $TAG_NAME -m "Published version $PACKAGE_VERSION of SUIT to NPM."

echo "Done. Version $PACKAGE_VERSION of SUIT is now available for use by applications."
echo "The Git repository has been tagged with: $TAG_NAME"
