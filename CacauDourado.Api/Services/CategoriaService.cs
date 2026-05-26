using CacauDourado.Api.Configurations;
using CacauDourado.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CacauDourado.Api.Services;

public class CategoriaService
{
    private readonly IMongoCollection<Categoria> _categoriasCollection;

    public CategoriaService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(
            mongoDbSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            mongoDbSettings.Value.DatabaseName);

        _categoriasCollection =
            mongoDatabase.GetCollection<Categoria>("Categorias");
    }

    public async Task<List<Categoria>> GetAsync() =>
        await _categoriasCollection.Find(_ => true).ToListAsync();

    public async Task<Categoria?> GetByIdAsync(string id) =>
        await _categoriasCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Categoria categoria) =>
        await _categoriasCollection.InsertOneAsync(categoria);

    public async Task UpdateAsync(string id, Categoria categoria) =>
        await _categoriasCollection.ReplaceOneAsync(x => x.Id == id, categoria);

    public async Task DeleteAsync(string id) =>
        await _categoriasCollection.DeleteOneAsync(x => x.Id == id);
}