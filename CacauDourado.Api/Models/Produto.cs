using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CacauDourado.Api.Models;

public class Produto
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Nome { get; set; } = null!;

    public decimal Preco { get; set; }

    public string CategoriaId { get; set; } = null!;

    public string? Descricao { get; set; }

    public string? ImagemUrl { get; set; }

    public bool Destaque { get; set; }
}