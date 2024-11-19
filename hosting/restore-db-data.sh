#!/bin/bash

DB_NAME=$1

cat restore.sql | docker exec -i opt-db-1 psql -U postgres -d $DB_NAME