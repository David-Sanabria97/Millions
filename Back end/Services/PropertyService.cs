using PropertyAPI.Repositories;
using PropertyAPI.Models;
using PropertyAPI.Dtos;

namespace PropertyAPI.Services;

public class PropertyService
{
    private readonly IPropertyRepository _propertyRepository;

    public PropertyService(IPropertyRepository propertyRepository)
    {
        _propertyRepository = propertyRepository;
    }

    public async Task<List<PropertyDto>> GetAllPropertiesAsync()
    {
        var properties = await _propertyRepository.GetAllPropertiesAsync();

        return properties.Select(p => new PropertyDto
        {
            IdProperty = p.IdProperty,
            Name = p.Name,
            Address = p.Address,
            Price = p.Price,
            CodeInternal = p.CodeInternal,
            Year = p.Year,
            IdOwner = p.IdOwner,
            Bedrooms = p.Bedrooms,
            Bathrooms = p.Bathrooms,
            Area = p.Area,
            

        }).ToList();
    }

}
