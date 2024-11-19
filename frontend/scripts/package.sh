#!/bin/bash

cd "${0%/*}/.."

docker run --rm -v "$PWD":/app -w /app node:20 bash ./scripts/build.sh

WORKSPACES=$(jq -r '.workspaces[]' package.json | grep 'packages')

PREFIX=$1
BUILD=${2:dev}

# Loop through each workspace and check for the keyword in the package.json
for WORKSPACE in $WORKSPACES
do
  package_json="$WORKSPACE/package.json"

  # Check if the package.json contains the keyword in the "keywords" field
  if jq -e ".keywords | index(\"frontend\")" $package_json > /dev/null
  then
    echo "Building container from workspace: $WORKSPACE"

    i=`basename $WORKSPACE`

    cp nginx.conf $WORKSPACE/nginx.conf

    IMAGENAME="${PREFIX}frontend-$i-$BUILD"
    IMAGENAME_LATEST="${IMAGENAME}:latest"
    IMAGENAME_TODAY="${IMAGENAME}:$(date +%Y%m%d)"

    docker build --build-arg="BUILD_CTX=$i" -f Dockerfile -t $IMAGENAME_LATEST -t $IMAGENAME_TODAY $WORKSPACE || { echo "Docker Build failed."; exit 3; }

    if [ ! -z "$PREFIX" ]
    then
      docker push --all-tags $IMAGENAME || { echo "Docker Push failed."; exit 4; }
    else
      docker save realgimm-frontend-$i-$BUILD:latest | gzip > ../rg-fe-$i-$BUILD.tgz
      echo "Saved rg-fe-$i-$BUILD.tgz"
    fi
  else
    echo "Skipping workspace: $WORKSPACE"
  fi
done
