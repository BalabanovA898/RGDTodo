using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Используем порт из переменной окружения Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

// Слушаем на всех интерфейсах
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Либо через ConfigureKestrel:
// builder.WebHost.ConfigureKestrel(options =>
// {
//     options.ListenAnyIP(int.Parse(port));
// });

// CORS - разрешаем всё для тестирования
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Ваши сервисы
builder.Services.AddTransient<IDbService, DbService>();
builder.Services.AddTransient<ISessionService, SessionService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.Title = "My API (.NET 9)";
    config.Version = "v1";
});
builder.Services.AddControllers();

// База данных
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"));
});

var app = builder.Build();

// Включить CORS ПОСЛЕ routing middleware
app.UseCors("AllowAll");
app.MapControllers().RequireCors("AllowAll");

// Swagger
app.UseOpenApi();
app.UseSwaggerUi();

// Health check endpoint
app.MapGet("/health", () => new 
{
    Status = "OK",
    Timestamp = DateTime.UtcNow,
    Port = port,
    Host = Dns.GetHostName()
});

app.Run();