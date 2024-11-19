#!/bin/bash

cd ./lib/gql/

for file in *
do
  if [[ "$file" != "scalars.ts" ]]; then
    sed -i "" "/^export type Omit</d" $file
  fi
done
