using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddTransient<IDbService, DbService>();
builder.Services.AddTransient<ISessionService, SessionService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"));
});

var app = builder.Build();


app.MapControllers();
app.UseHttpsRedirection();
app.Run();
