using MongoDB.Driver;
using PropertyAPI.Models;
using Microsoft.Extensions.Configuration;

namespace PropertyAPI.Repositories;

public class PropertyTraceRepository : IPropertyTraceRepository
{
    private readonly IMongoCollection<PropertyTrace> _collection;

    public PropertyTraceRepository(IConfiguration config)
    {
        var client = new MongoClient(config.GetConnectionString("MongoDb"));
        var database = client.GetDatabase(config["DatabaseSettings:DatabaseName"]);
        _collection = database.GetCollection<PropertyTrace>(config["DatabaseSettings:Collections:PropertyTraces"]);
    }

    public async Task<List<PropertyTrace>> GetByPropertyIdAsync(string idProperty)
    {

        var filter = Builders<PropertyTrace>.Filter.Eq(p => p.IdProperty, idProperty);

        return await _collection.Find(filter).ToListAsync();

    }

   
}