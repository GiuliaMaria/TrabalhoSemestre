using CacauDourado.Api.Models;
using CacauDourado.Api.Configurations;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CacauDourado.Api.Services;

public class ProdutoService
{
    private readonly IMongoCollection<Produto> _produtosCollection;

    public ProdutoService(
        IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(
            mongoDbSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            mongoDbSettings.Value.DatabaseName);

        _produtosCollection = mongoDatabase.GetCollection<Produto>(
            "Produtos");
    }

    public async Task<List<Produto>> GetAsync() =>
        await _produtosCollection.Find(_ => true).ToListAsync();

    public async Task<Produto?> GetAsync(string id) =>
        await _produtosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Produto novoProduto) =>
        await _produtosCollection.InsertOneAsync(novoProduto);

    public async Task UpdateAsync(string id, Produto produtoAtualizado) =>
        await _produtosCollection.ReplaceOneAsync(x => x.Id == id, produtoAtualizado);

    public async Task RemoveAsync(string id) =>
        await _produtosCollection.DeleteOneAsync(x => x.Id == id);
}