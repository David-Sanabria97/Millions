using MongoDB.Driver;
using PropertyAPI.Models;
using Microsoft.Extensions.Configuration;

namespace PropertyAPI.Repositories;

public class PropertyImageRepository : IPropertyImageRepository
{
    private readonly IMongoCollection<PropertyImage> _collection;

    public PropertyImageRepository(IConfiguration config)
    {
        var client = new MongoClient(config.GetConnectionString("MongoDb"));
        var database = client.GetDatabase(config["DatabaseSettings:DatabaseName"]);
        _collection = database.GetCollection<PropertyImage>(config["DatabaseSettings:Collections:PropertiesImages"]);
    }

    public async Task<List<PropertyImage>> GetByPropertyIdAsync(string idProperty)
    {

        var filter = Builders<PropertyImage>.Filter.Eq(p => p.IdProperty, idProperty);

        return await _collection.Find(filter).ToListAsync();

    }

   
}