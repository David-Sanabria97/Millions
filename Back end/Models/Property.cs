using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertyAPI.Models;

public class Property
{
    [BsonRepresentation(BsonType.ObjectId)]
     [BsonElement("_id")]
    public string Id { get; set; }

    [BsonElement("IdProperty")]
    public string IdProperty { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public decimal Price { get; set; }
    public string CodeInternal { get; set; }
    public decimal Year { get; set; }
    public string IdOwner { get; set; }


}