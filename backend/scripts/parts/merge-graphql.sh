#!/bin/bash

cd "${0%/*}/../.."

cd tmp

# Join all common type definitions in a single file
COMMON_TYPES_FILE="../../graphql/RealGimm.Commons.schema.graphql"
> $COMMON_TYPES_FILE  # Empty the file before starting

# Directory or array of backend-specific GraphQL files
BACKEND_FILES=("../../graphql/RealGimm.Web.schema.graphql" "../../graphql/RealGimm.WebFrontOffice.schema.graphql")

# Temporary file to store all types across files
TEMP_FILE1="/tmp/all_types.tmp"
TEMP_FILE2="/tmp/common_types.tmp"
MOVED_TYPES="/tmp/moved_types.tmp"

# Empty the files before starting
> $MOVED_TYPES
> $TEMP_FILE1

# Step 1: Extract all type names from each backend file and store them in a temp file
for file in "${BACKEND_FILES[@]}"; do
    # Extract lines that define types and store them along with the filename
    grep -E '^(type|input|enum|interface) ' "$file" | awk -v f="$file" '{print $2 " " f}' >> $TEMP_FILE1
done

# Step 2: Find types that are defined in more than one file (common types)
awk '{print $1}' $TEMP_FILE1 | sort | uniq -d > $TEMP_FILE2

# Step 3: Move common types to the common file and remove them from specific files
while read -r type; do
    # Check if this type has already been moved to the common file
    if grep -q "$type" $MOVED_TYPES; then
        # If the type is already moved, skip it to avoid duplicates
        continue
    fi

    echo "Removing common type $type..."

    # Step 3a: Move the common type to the common file from the first file it is found in
    for file in "${BACKEND_FILES[@]}"; do
        # If the type exists in this file, extract its full definition
        if grep -qE "^(type|input|enum|interface) $type" "$file"; then
            # Extract the full definition of the type, handling multi-line definitions
            sed -n "/^\(type\|input\|enum\|interface\) $type/,/\}/p" "$file" >> $COMMON_TYPES_FILE
            echo "" >> $COMMON_TYPES_FILE  # Add an empty line after each type

            # Add this type to the moved types list to avoid duplicates
            echo "$type" >> $MOVED_TYPES

            # After moving it once, we break out of the loop, so it isn't moved again
            break
        fi
    done

    # Step 3b: Now remove the common type from all files where it is found
    for file in "${BACKEND_FILES[@]}"; do
        # Remove the type from the specific file
        sed -i "/^\(type\|input\|enum\|interface\) $type/,/\}/d" "$file"
    done
done < $TEMP_FILE2

# Clean up temp files
#rm $TEMP_FILE2
#rm $TEMP_FILE1
#rm $MOVED_TYPES

echo "Common types have been extracted to $COMMON_TYPES_FILE."
