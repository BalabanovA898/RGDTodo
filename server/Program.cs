using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddTransient<IDbService, DbService>();
builder.Services.AddTransient<ISessionService, SessionService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.Title = "My API (.NET 9)";
    config.Version = "v1";
});

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "mySpec", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"));
});

var app = builder.Build();

app.MapControllers();
app.UseHttpsRedirection();

app.UseOpenApi();
app.UseSwaggerUi();

app.UseCors("mySpec");
app.Run();
