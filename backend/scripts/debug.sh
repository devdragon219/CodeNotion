#!/bin/bash

cd "${0%/*}/.."

dotnet build || { echo "Dotnet Build failed."; exit 1; }

cp -r src/Infrastructure/bin/Debug/net8.0/* src/Web/bin/Debug/net8.0/
cp -r src/Infrastructure/bin/Debug/net8.0/* src/TenantCtl/bin/Debug/net8.0/
cp -r src/Web/appsettings.json src/TenantCtl/bin/Debug/net8.0/