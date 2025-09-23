using PropertyAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyAPI.Repositories;

public interface IPropertyImageRepository
{
    Task<List<PropertyImage>> GetByPropertyIdAsync(string idProperty);
}