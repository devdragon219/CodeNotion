#!/bin/bash

OUTPUT=index.ts

cd ./lib/

for dir in $(find . -maxdepth 1 -mindepth 1 ! -name '@types' ! -name 'assets' ! -name 'gql' -type d)
do
  cd "$dir"
  rm -f "$OUTPUT"
	touch "$OUTPUT"

	for file in $(find . -mindepth 1 ! -name $OUTPUT ! -name '*.test.*' ! -name '*.json' -type f)
  do
		echo "export * from '$file';" >>"$OUTPUT"
	done

  cd ..
done
