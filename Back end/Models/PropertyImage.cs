using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertyAPI.Models;

public class PropertyImage
{
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; }

    [BsonElement("IdPropertyImage")]
    public string IdPropertyImage { get; set; }
    public string IdProperty { get; set; }
    public string File { get; set; }
    public bool Enabled { get; set; }
}