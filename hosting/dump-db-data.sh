#!/bin/bash

DB_NAME=$1

docker exec -it opt-db-1 pg_dump -U postgres --data-only --column-inserts $DB_NAME | grep -v "MigrationHistory\"" | grep -v "^pg_dump:" > dump.sql
echo "SET session_replication_role='replica';" > delete-tables.sql
docker exec -i opt-db-1 psql -U postgres -d $DB_NAME -t -c "SELECT CONCAT(schemaname, '.\"', tablename, '\"') FROM pg_tables WHERE schemaname IN ('anag', 'asst', 'common', 'iam', 'prop', 'econ', 'nrgy', 'fclt')" | grep -v "MigrationHistory" | sed '/^$/d; s/^/DELETE FROM /; s/$/;/' >> delete-tables.sql
echo "SET session_replication_role='origin';" >> dump.sql

cat delete-tables.sql dump.sql > restore.sql
rm delete-tables.sql dump.sql