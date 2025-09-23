using PropertyAPI.Dtos;
using PropertyAPI.Repositories;

namespace PropertyAPI.Application.UseCases;

public class GetPropertyDetailUseCase
{
    private readonly IPropertyRepository _propertyRepo;
    private readonly IOwnerRepository _ownerRepo;
    private readonly IPropertyImageRepository _imageRepo;
    private readonly IPropertyTraceRepository _traceRepo;



    public GetPropertyDetailUseCase(
        IPropertyRepository propertyRepo,
        IOwnerRepository ownerRepo,
        IPropertyImageRepository imageRepo,
        IPropertyTraceRepository traceRepo
        )
    {
        _propertyRepo = propertyRepo;
        _ownerRepo = ownerRepo;
        _imageRepo = imageRepo;
        _traceRepo = traceRepo;
    }

    public async Task<List<PropertiesDetailsDto>> Execute(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {

        var properties = await _propertyRepo.GetFilteredProperties(name, address, minPrice, maxPrice);
        var result = new List<PropertiesDetailsDto>();

        foreach (var property in properties)
    {
        var owner = await _ownerRepo.GetByIdAsync(property.IdOwner);
        var images = await _imageRepo.GetByPropertyIdAsync(property.IdProperty);
        var traces = await _traceRepo.GetByPropertyIdAsync(property.IdProperty);

        result.Add(new PropertiesDetailsDto
        {
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            CodeInternal = property.CodeInternal,
            Year = property.Year,
            IdProperty = property.IdProperty,
            Owner = owner == null ? null : new OwnerDto
            {
                Name = owner.Name,
                Address = owner.Address,
                Photo = owner.Photo,
                BirthDay = owner.BirthDay
            },
            Images = images.Select(i => new PropertyImageDto
            {
                IdPropertyImage = i.IdPropertyImage,
                IdProperty = i.IdProperty,
                File = i.File,
                Enabled = i.Enabled
            }).ToList(),
            Traces = traces.Select(t => new PropertyTraceDto
            {
                IdPropertyTrace = t.IdPropertyTrace,
                DateSale = t.DateSale,
                Name = t.Name,
                Value = t.Value,
                Tax = t.Tax,
                IdProperty = t.IdProperty
            }).ToList()
        });
    }

    return result;
    }
}