#!/bin/bash

cd "${0%/*}/../.."

INPUT="src/Core/IAM/Features.cs"

OUTPUT="../frontend/packages/web/src/enums/RawFeature.ts"

awk '/public const string [A-Za-z_][A-Za-z0-9_]* = / {
    row=$0;
    name=$4;
    value=$6;
    gsub("\"", "", value);
    gsub(/\r/, "", value);
    gsub(";", "", value);
    print "  " name " = \"" value "\",";
}'  "$INPUT" > "$OUTPUT"

sed -i "s/\"/\'/g" "$OUTPUT"

# Add TypeScript const declaration and export statement
echo -e "export enum RawFeature {\n$(cat "$OUTPUT")\n}" > "$OUTPUT"

echo "TypeScript Feature enum generated in $OUTPUT"