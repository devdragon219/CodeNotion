#!/bin/bash

cd "${0%/*}/.."

scripts/build.sh || { echo "Build phase failed."; exit 1; }

pushd tmp
    echo "Starting web app..."
    ./RealGimm.Web
popd