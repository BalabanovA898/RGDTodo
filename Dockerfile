FROM node:18-alpine AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./

RUN npm ci --only=production

COPY client/ .

RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-builder

WORKDIR /app/server

COPY server/*.csproj ./
RUN dotnet restore

COPY server/ .

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=backend-builder /app/publish .

COPY --from=frontend-builder /app/client/build ./wwwroot

ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-10000}
ENV ASPNETCORE_ENVIRONMENT=Production

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:${PORT:-10000}/health || exit 1

EXPOSE ${PORT:-10000}

ENTRYPOINT ["dotnet", "server.dll"]