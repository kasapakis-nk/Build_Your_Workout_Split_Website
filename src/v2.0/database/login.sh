#!/bin/bash
set -e

# Load environment variables.
grep -v '^#' /usr/local/bin/.env

# Repeatedly checks if the MySQL server at localhost is ready to accept connections.
echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h "127.0.0.1" --silent; do
    sleep 2
done

echo "Logging in as user DB_USER..."
mysql -u{DB_USER} -p{DB_PASSWORD} -h 127.0.0.1 SplitOrganizerDB
# mysql -uroot -p${DB_ROOT_PASSWORD} -h 127.0.0.1 SplitOrganizerDB

# Keep the container running after exiting MySQL
tail -f /dev/null

