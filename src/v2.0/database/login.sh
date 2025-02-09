#!/bin/bash
set -e

# Repeatedly checks if the MySQL server at localhost is ready to accept connections.
echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h "127.0.0.1" --silent; do
    sleep 2
done

echo "Logging in as user nikos..."
mysql -unikos -pmastermag3 -h 127.0.0.1 SplitOrganizerDB
# mysql -uroot -pmastermag3 -h 127.0.0.1 SplitOrganizerDB

# Keep the container running after exiting MySQL
tail -f /dev/null

