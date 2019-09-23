#!/bin/bash

# Script to do a full, clean build of the SUIT library
# Removes any node modules and build products and then re-runs
# yarn install, does all of the available validation, and builds
# both the documentation and the library itself
rm -rf  node_modules && \
rm -rf es && \
rm -rf lib && \
rm -rf styleguide && \
yarn install && \
yarn lint && \
yarn flow && \
yarn validatecomponents && \
yarn doclint && \
yarn test:coverage && \
yarn doc && \
yarn build && \
yarn styleguide
