#!/bin/bash

cd "${0%/*}/.."

shopt -s nullglob

mkdir tmp 2> /dev/null

if command -v sudo  >/dev/null 2>&1
then
    sudo rm -rf tmp/*
else
    rm -rf tmp/*
fi

dotnet publish -c Release -r linux-x64 --self-contained  || { echo "Dotnet Publish failed."; exit 1; }

db_overrides=(DATABASE_USE_*)

if [ ${#db_overrides[@]} -gt 0 ]
then
  echo "Using MsSql database"
  cp -r src/Infra.MsSql/bin/Release/net8.0/linux-x64/publish/* tmp/
else
  echo "Using PgSql database"
  cp -r src/Infra.PgSql/bin/Release/net8.0/linux-x64/publish/* tmp/
fi

cp -r src/Web/bin/Release/net8.0/linux-x64/publish/* tmp/
cp -r src/WebFrontOffice/bin/Release/net8.0/linux-x64/publish/* tmp/
cp -r src/TenantCtl/bin/Release/net8.0/linux-x64/publish/* tmp/
cp -r src/Infrastructure/bin/Release/net8.0/linux-x64/publish/* tmp/
cp -r src/Tasks/bin/Release/net8.0/linux-x64/publish/* tmp/

for dir in $(find src/ -maxdepth 1 -name 'Plugin.*' -type d)
do
  cp -r $dir/bin/Release/net8.0/linux-x64/publish/* tmp/
done

if [ -d "customizations/" ]
then
  # Find and copy all published projects under the customizations/ directory
  for dir in $(find customizations/ -name 'bin' -type d)
  do
      if [ -d "$dir/Release/net8.0/linux-x64/publish" ]
      then
          cp -r "$dir/Release/net8.0/linux-x64/publish/"* tmp/
      fi
  done
fi
