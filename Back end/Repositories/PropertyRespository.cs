using MongoDB.Driver;
using PropertyAPI.Models;
using Microsoft.Extensions.Configuration;

namespace PropertyAPI.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _collection;

    public PropertyRepository(IConfiguration config)
    {
        var client = new MongoClient(config.GetConnectionString("MongoDb"));
        var database = client.GetDatabase(config["DatabaseSettings:DatabaseName"]);
        _collection = database.GetCollection<Property>(config["DatabaseSettings:Collections:Properties"]);
    }

    public async Task<IEnumerable<Property>> GetFilteredProperties(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrEmpty(name))
        filters.Add(filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i")));

        if (!string.IsNullOrEmpty(address))
            filters.Add(filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(address, "i")));

        if (minPrice.HasValue)
            filters.Add(filterBuilder.Gte(p => p.Price, minPrice.Value));

        if (maxPrice.HasValue)
            filters.Add(filterBuilder.Lte(p => p.Price, maxPrice.Value));


        var filter = filters.Any() ? filterBuilder.And(filters) : filterBuilder.Empty;

        return await _collection.Find(filter).ToListAsync();
    }

     public async Task<Property?> GetByIdAsync(string idProperty)
        {
            return await _collection.Find(p => p.IdProperty == idProperty).FirstOrDefaultAsync();
        }

    public async Task<List<Property>> GetAllPropertiesAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }
}