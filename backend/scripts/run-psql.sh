#!/bin/bash

cd "${0%/*}/.."

if ! [ -x "$(command -v docker)" ]
then
  echo "Do not run this script from the terminal inside the devcontainer! Run it from the docker host."
  exit
fi

docker exec -it --user postgres development_db_1 /usr/local/bin/psql
