using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CacauDourado.Api.Models;

public class Categoria
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Nome { get; set; } = null!;
}