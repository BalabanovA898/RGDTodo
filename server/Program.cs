using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"));
});
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IDbService, DbService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevelopmentPolicy");
}

using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
dbContext.Database.Migrate(); 

app.UseDefaultFiles();  
app.UseStaticFiles();   

app.MapControllers();

app.MapGet("/health", () => new 
{
    Status = "healthy",
    Timestamp = DateTime.UtcNow,
    Service = "Todo App (API + React)",
    Port = port,
    Environment = app.Environment.EnvironmentName
});

app.MapFallbackToFile("/index.html");

app.Run();