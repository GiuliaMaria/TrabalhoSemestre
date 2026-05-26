using CacauDourado.Api.Services;
using CacauDourado.Api.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.Configure<MongoDbSettings>(options =>
{
    options.ConnectionString =
        Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")!;

    options.DatabaseName =
        builder.Configuration["MongoDbSettings:DatabaseName"]!;
});

builder.Services.AddSingleton<CategoriaService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();