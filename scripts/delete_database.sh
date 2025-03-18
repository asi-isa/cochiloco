#!/usr/bin/env bash

# Specify the .env file, or allow it to be passed as an argument
ENV_FILE=${1:-"./.env"}

# Check if the .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "The .env file specified ($ENV_FILE) does not exist."
  exit 1
fi

# Load the .env file
set -a
source $ENV_FILE
set +a

# Extract database name from DATABASE_URI
DB_NAME=$(echo $DATABASE_URI | awk -F'/' '{print $NF}')

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again."
  exit 1
fi

# Check if the container exists
if [ "$(docker ps -a -q -f name=$DB_NAME)" ]; then
    echo "Found container: $DB_NAME"
    
    # Stop the container if it's running
    if [ "$(docker ps -q -f name=$DB_NAME)" ]; then
        echo "Stopping container..."
        docker stop $DB_NAME
    fi
    
    # Remove the container and its volumes
    echo "Removing container and associated volumes..."
    docker rm -v $DB_NAME
    
    echo "Container successfully deleted."
else
    echo "No container found with name: $DB_NAME"
fi

# Clean up any dangling volumes
echo "Cleaning up any dangling volumes..."
docker volume prune -f

echo "Cleanup complete." 