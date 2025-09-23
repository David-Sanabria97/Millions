using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertyAPI.Models;

public class Owner
{
    [BsonRepresentation(BsonType.ObjectId)]

    [BsonElement("_id")]
    public string Id { get; set; }

    [BsonElement("IdOwner")]
    public string IdOwner { get; set;}

    public string Name { get; set; }
    public string Address { get; set; }
    public string Photo { get; set; }
    public DateTime BirthDay { get; set; }

}