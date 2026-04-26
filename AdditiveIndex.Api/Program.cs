using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Data;
using AdditiveIndex.Api.Services;
using AdditiveIndex.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? "Data Source=additiveindex.db"));

// Open Food Facts HTTP client
builder.Services.AddHttpClient("OffApi", client =>
{
    client.BaseAddress = new Uri("https://world.openfoodfacts.org/");
    client.DefaultRequestHeaders.Add("User-Agent", "AdditiveIndex/1.0");
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<OffDataImporter>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seed data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await SeedData.InitializeAsync(db);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
