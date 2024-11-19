#!/bin/bash

OUTPUT=index.ts

cd ./lib/

for dir in $(find . -maxdepth 1 -mindepth 1 ! -name '@types' ! -name 'assets' ! -name 'gql' -type d)
do
  rm -f "$dir/$OUTPUT"
done
