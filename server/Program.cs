using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// === КОНФИГУРАЦИЯ ПОРТА ===
// Render передает порт через переменную окружения PORT
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// === КОНФИГУРАЦИЯ СЕРВИСОВ ===
builder.Services.AddControllers();

// CORS НЕ НУЖЕН для статики из того же origin!
// Но оставим для API если нужно
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Ваши существующие сервисы
builder.Services.AddTransient<IDbService, DbService>();
builder.Services.AddTransient<ISessionService, SessionService>();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"));
});

var app = builder.Build();

// === ПРОМЕЖУТОЧНОЕ ПО (MIDDLEWARE) ===
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevelopmentPolicy");
}

using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
dbContext.Database.Migrate(); // Применяет pending миграции

// 1. Обслуживаем статические файлы React
//    Vite собирает фронтенд в папку 'dist'
app.UseDefaultFiles();  // Ищет index.html, index.htm
app.UseStaticFiles();   // Обслуживает файлы из wwwroot

// 2. API маршрутизация
app.MapControllers();

// 3. Health check endpoint для Render
app.MapGet("/health", () => new 
{
    Status = "healthy",
    Timestamp = DateTime.UtcNow,
    Service = "Todo App (API + React)",
    Port = port,
    Environment = app.Environment.EnvironmentName
});

// 4. ВСЕ остальные маршруты → index.html (для SPA маршрутизации)
app.MapFallbackToFile("/index.html");

app.Run();