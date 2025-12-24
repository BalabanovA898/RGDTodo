# ==================== ЭТАП 1: Сборка фронтенда ====================
FROM node:18-alpine AS frontend-builder

# Устанавливаем рабочую директорию для фронтенда
WORKDIR /app/client

# 1. Копируем package.json отдельно для лучшего кэширования
COPY client/package*.json ./

# 2. Устанавливаем зависимости
RUN npm ci --only=production

# 3. Копируем исходный код фронтенда
COPY client/ .

# 4. Собираем React приложение с Vite
RUN npm run build
# Результат: /app/client/dist

# ==================== ЭТАП 2: Сборка бэкенда ====================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-builder

WORKDIR /app/server

# 1. Копируем проект отдельно для кэширования
COPY server/*.csproj ./
RUN dotnet restore

# 2. Копируем остальной код
COPY server/ .

# 3. Публикуем приложение
RUN dotnet publish -c Release -o /app/publish
# Результат: /app/publish

# ==================== ЭТАП 3: ФИНАЛЬНЫЙ ОБРАЗ ====================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

# Мета информация
WORKDIR /app

# 1. Копируем собранный бэкенд из второго этапа
COPY --from=backend-builder /app/publish .

# 2. Копируем собранный фронтенд в папку wwwroot
#    .NET автоматически обслуживает статику из wwwroot
COPY --from=frontend-builder /app/client/build ./wwwroot

# 3. Настройка порта (Render использует переменную PORT)
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-10000}
ENV ASPNETCORE_ENVIRONMENT=Production

# 4. Health check для Docker и Render
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:${PORT:-10000}/health || exit 1

# 5. Открываем порт
EXPOSE ${PORT:-10000}

# 6. Запускаем приложение
ENTRYPOINT ["dotnet", "server.dll"]