#!/bin/bash

cd "${0%/*}/.."

export TOOLS_DIRECTORY="$(realpath `pwd`/../tools/)"

rm -rf tests/FunctionalTests.Web/TestResults
rm -rf tests/FunctionalTests.TenantCtl/TestResults
rm -rf tests/FunctionalTests.Tasks/TestResults
rm -rf tests/IntegrationTests/TestResults
rm -rf tests/UnitTests/TestResults
rm -rf tests/TestResults
rm -rf ../coverage/backend

# This name should match the one in tests/Integration/../CmisRepoFixture.cs and tests/Functional.Web/../SharedDockerCmisService.cs
CMIS_IMAGE_NAME="inmemory-cmis2"

if [[ $(docker images -q $CMIS_IMAGE_NAME 2> /dev/null) == "" ]]
then
  echo "Inmemory cmis image not found, building..."
  docker build -t $CMIS_IMAGE_NAME $TOOLS_DIRECTORY/opencmis-inmemory
  echo "Inmemory cmis image built, on with tests."
fi

# This is for the export shared cache
export CachePath=`pwd`/cachepath

mkdir -p cachepath

rm cachepath/* > /dev/null 2>&1

# If applicable, use e.g. "--filter FullyQualifiedName~FunctionalTests.Web" to filter specific tests

dotnet test --settings:"tests/coverlet.runsettings" || { echo "Tests failed in $(($SECONDS / 60))min $(($SECONDS % 60))sec"; exit 1; }

# If dotnet-coverage is not installed, fix it
export PATH="$PATH:/github/home/.dotnet/tools:/root/.dotnet/tools"
if [ -z "$(dotnet tool list -g | grep dotnet-coverage)" ]; then
    dotnet tool install --global dotnet-coverage
fi

mkdir tests/TestResults

dotnet-coverage merge -o tests/TestResults/coverage-merged.xml -f cobertura -r coverage.cobertura.xml
find . -name coverage.cobertura.xml -delete
mkdir -p ../coverage/backend/

#Remove any remains of test data from cobertura file
if [ -f /etc/debian_version ]; then
    sudo apt-get update || apt-get update
    sudo apt-get install -y xmlstarlet || apt-get install -y xmlstarlet
elif [ -f /etc/redhat-release ]; then
    sudo dnf install -y xmlstarlet || dnf install -y xmlstarlet
fi

xmlstarlet ed -d "//package[starts-with(@name, 'RealGimm.FunctionalTests.')]" tests/TestResults/coverage-merged.xml > ../coverage/backend/coverage.cobertura.xml

echo "Tests succeeded in $(($SECONDS / 60))min $(($SECONDS % 60))sec"
