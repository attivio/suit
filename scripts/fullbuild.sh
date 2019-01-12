#!/bin/bash

# Script to do a full, clean build of the SUIT library
# Removes any node modules and build products and then re-runs
# npm install, does all of the available validation, and builds
# both the documentation and the library itself
rm -rf  node_modules && \
rm -rf es && \
rm -rf lib && \
rm -rf styleguide && \
npm install && \
npm run build && \
npm run buildflow && \
npm run validatecomponents && \
npm run doclint && \
npm run test && \
npm run styleguide && \
npm run doc
