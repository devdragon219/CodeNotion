#!/bin/bash

cd ./src/gql/

for file in *
do
  sed -i "" "/^export type Omit</d" $file
done
