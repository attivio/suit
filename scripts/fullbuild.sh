#!/bin/bash

# Script to do a full, clean build of the SUIT library
# Removes any node modules and build products and then re-runs
# npm install, does all of the available validation, and builds
# both the styleguide and the library itself
rm -rf  node_modules && \
rm -rf es && \
rm -rf lib && \
rm -rf styleguide && \
npm install && \ 
npm run lint && \
npm run flow && \ 
npm run validateComponents \
npm run styleguide && \
npm run build
