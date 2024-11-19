#!/bin/bash

cd "${0%/*}/.."

export CI=true
export NODE_OPTIONS=--max-old-space-size=4096

corepack enable
yarn install --immutable --immutable-cache
yarn build

time yarn tsc || { echo "Typescript compilation failed."; exit 1; }
echo "TS Compilation complete; linting..."

time TIMING=1 yarn lint
echo "Linting complete; testing..."

yarn test

rm -rf ../coverage/frontend
mkdir -p ../coverage/frontend

cp packages/web/coverage/cobertura-coverage.xml ../coverage/frontend/coverage.cobertura.xml
