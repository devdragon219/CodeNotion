#!/bin/bash

cd "${0%/*}/.."

export CI=true
export NODE_OPTIONS=--max-old-space-size=4096

corepack enable
yarn install --immutable --immutable-cache
yarn build
