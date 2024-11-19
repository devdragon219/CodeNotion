#!/bin/bash

cd "${0%/*}/.."

scripts/build.sh || { echo "Build phase failed."; exit 1; }

pushd tmp
    export ASPNETCORE_ENVIRONMENT=Development
    ./RealGimm.Web --urls=http://0.0.0.0:5050
popd