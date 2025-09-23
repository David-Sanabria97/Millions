using PropertyAPI.Models;

namespace PropertyAPI.Repositories;

public interface IPropertyRepository
{
    Task<IEnumerable<Property>> GetFilteredProperties(string? name, string? address, decimal? minPrice, decimal? maxPrice);
    Task<Property?> GetByIdAsync(string idProperty);
    Task<List<Property>> GetAllPropertiesAsync();
}