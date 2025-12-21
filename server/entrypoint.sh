#!/bin/bash
set -e

# Ожидание готовности PostgreSQL
until pg_isready -h dbservice -p 5432 -U postgres; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Устанавливаем EF tools (если еще не установлены)
if ! command -v dotnet-ef &> /dev/null; then
    echo "Installing EF Core tools..."
    dotnet tool install --global dotnet-ef --version 10.0.0
fi

# Применяем миграции
echo "Applying database migrations..."
export PATH="$PATH:/root/.dotnet/tools"
dotnet ef database update --no-build --verbose

# Запускаем приложение
echo "Starting application..."
exec dotnet server.dll --urls "http://*:5000"