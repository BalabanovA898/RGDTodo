# Простой Dockerfile для разработки
FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

RUN dotnet tool install --global dotnet-ef --version 9.0

COPY . .
ENV PATH="/root/.dotnet/tools:${PATH}"

EXPOSE 5000
ENTRYPOINT ["sh", "-c", "dotnet ef database update && dotnet run"]