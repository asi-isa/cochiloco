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

# Extract values from DATABASE_URI
DB_USER=$(echo $DATABASE_URI | awk -F'[/:@]' '{print $4}')
DB_PASSWORD=$(echo $DATABASE_URI | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_NAME=$(echo $DATABASE_URI | awk -F'/' '{print $NF}')
DB_PORT=$(echo $DATABASE_URI | awk -F'[/:]' '{print $6}')  # Extract port

# Output extracted values
echo "Database user: $DB_USER"
echo "Database password: $DB_PASSWORD"
echo "Database name: $DB_NAME"
echo "Database port: $DB_PORT"

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again."
  echo "Docker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Start the container if it exists, otherwise create it
if [ "$(docker ps -q -f name=$DB_NAME)" ]; then
  docker start $DB_NAME
  echo "Database container started"
  exit 0
fi

# Start or create the PostgreSQL container
docker run --name $DB_NAME \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -d -p $DB_PORT:5432 postgres:latest


# Wait for Postgres to be ready
echo "Waiting for Postgres to be ready..."
until docker exec $DB_NAME pg_isready -U $DB_USER -d $DB_NAME; do
  echo "Waiting for PostgreSQL to become ready..."
  sleep 2
done

echo "Postgres is ready."

# Run SQL commands to set up the user and database inside the container
echo "Configuring PostgreSQL..."

docker exec -i $DB_NAME psql -U $DB_USER -c "DO \$\$ BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME') THEN
      CREATE DATABASE \"$DB_NAME\";
   END IF;
END \$\$;"

docker exec -i $DB_NAME psql -U $DB_USER -c "DO \$\$ BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
      CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PASSWORD';
      ALTER ROLE $DB_USER CREATEDB;
   END IF;
END \$\$;"

echo "Database and user setup completed."

