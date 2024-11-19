#!/bin/bash

cd "${0%/*}/.."

scripts/build.sh || { echo "Build phase failed."; exit 1; }

scripts/parts/update-frontend-features.sh
scripts/parts/update-graphql.sh