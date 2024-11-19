#!/bin/bash

docker compose up -d --pull always --remove-orphans

docker image prune -f

START_TIME=$(docker inspect --format='{{.State.StartedAt}}' opt-bo-backend-1)

if [ -z "$START_TIME" ]; then
    echo "Failed to retrieve start time for backend container"
    exit 1
fi

# Convert start time and current time to Unix timestamps
START_TIMESTAMP=$(date --date="$START_TIME" +%s)
CURRENT_TIMESTAMP=$(date +%s)

# Calculate the difference in seconds
DIFF_SECONDS=$(( CURRENT_TIMESTAMP - START_TIMESTAMP ))

if [ $DIFF_SECONDS -le 90 ]; then
    echo "Container opt-bo-backend-1 was started or restarted in the last minute. Fixing db if needed..."
    docker exec opt-bo-backend-1 /app/TenantCtl fix
fi