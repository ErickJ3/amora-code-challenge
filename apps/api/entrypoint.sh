#!/bin/sh
set -e

echo "Waiting for postgres..."

while ! nc -z postgres 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

echo "Running migrations..."
cd /app/apps/api && pnpm db:migrate

echo "Starting API server..."
cd /app
exec "$@"