#!/bin/bash

cd "${0%/*}/.."

PREFIX=$1
BUILD=${2:dev}

IMAGENAME="${PREFIX}backend-${BUILD}"
IMAGENAME_LATEST="${IMAGENAME}:latest"
IMAGENAME_TODAY="${IMAGENAME}:$(date +%Y%m%d)"

echo "Tagging $IMAGENAME"

docker build -t $IMAGENAME_LATEST -t $IMAGENAME_TODAY . || { echo "Docker Build failed."; exit 2; }

docker push --all-tags $IMAGENAME || { echo "Docker Push failed."; exit 3; }