using PropertyAPI.Models;

namespace PropertyAPI.Repositories;

public interface IPropertyTraceRepository
{
    Task<List<PropertyTrace>> GetByPropertyIdAsync(string idProperty);
}