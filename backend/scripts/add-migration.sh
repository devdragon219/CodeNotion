#!/bin/bash

cd "${0%/*}/../src/"

if [ $# -lt 2 ]
then
    echo "Specify module directory (e.g. Anag) and migration name"
    exit 1
fi

if [ ! -d "Infrastructure/$1" ]
then
    echo "No such directory $1"
    exit 2
fi

DNAME=`/bin/ls Infrastructure/ | grep -i "^$1\$"`

if [ ! -f "Infrastructure/$1/Data/${1}DbContext.cs" ]
then
    echo "No such file Infrastructure/$1/Data/${1}DbContext.cs"
    exit 3
fi

dotnet tool restore

echo "Creating migration for ${1}DbContext"

cd Infra.PgSql
dotnet ef migrations add $2 -c "RealGimm.Infrastructure.$DNAME.Data.${DNAME}DbContext" -o "$DNAME"
cd ../Infra.MsSql
dotnet ef migrations add $2 -c "RealGimm.Infrastructure.$DNAME.Data.${DNAME}DbContext" -o "$DNAME"
cd ..

for file in `find Infra.PgSql/$DNAME/ -name '*.cs'`; do
  sed -i -z 's/migrationBuilder\.AlterDatabase()\n\s*\.Annotation("Npgsql:PostgresExtension:postgis", ",,");//g' "$file"
done
