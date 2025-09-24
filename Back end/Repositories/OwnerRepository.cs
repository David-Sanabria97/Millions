using MongoDB.Driver;
using PropertyAPI.Models;
using Microsoft.Extensions.Configuration;

namespace PropertyAPI.Repositories;

public class OwnerRepository : IOwnerRepository
{
    private readonly IMongoCollection<Owner> _collection;


    public OwnerRepository(IConfiguration config )
    
    {
        var client = new MongoClient(config.GetConnectionString("MongoDb"));
        var database = client.GetDatabase(config["DatabaseSettings:DatabaseName"]);
        _collection = database.GetCollection<Owner>(config["DatabaseSettings:Collections:Owners"]);

    }

    public async Task<Owner> GetByIdAsync(string idOwner)
    {

        var filter = Builders<Owner>.Filter.Eq(o => o.IdOwner, idOwner);
        
        var owner = await _collection.Find(filter).FirstOrDefaultAsync(); 

        return  owner;
        
    }

   
}