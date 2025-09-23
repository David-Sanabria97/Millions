using PropertyAPI.Models;

namespace PropertyAPI.Repositories;

public interface IOwnerRepository
{
    Task<Owner> GetByIdAsync(string? idOwner);
}