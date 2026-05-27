using CacauDourado.Api.Services;
using CacauDourado.Api.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoDbSettings>(options =>
{
    options.ConnectionString =
    builder.Configuration["MongoDbSettings:ConnectionString"]!;

    options.DatabaseName =
        builder.Configuration["MongoDbSettings:DatabaseName"]!;
});

builder.Services.AddSingleton<CategoriaService>();
builder.Services.AddSingleton<ProdutoService>();

// ADICIONE ISSO AQUI
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ADICIONE ISSO AQUI
app.UseCors("AllowAll");

app.MapControllers();

app.Run();