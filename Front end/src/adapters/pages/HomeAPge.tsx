import { useEffect, useState } from 'react';
import { ApiPropertyRepository } from '../../infrastructure/api/ApiPropertyRepository';
import { FetchProperties } from '../../core/useCases/FetchProperties';
import { Property } from '../../core/model/Property';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const repo = new ApiPropertyRepository();
  const fetchProperties = new FetchProperties(repo);

  useEffect(() => {
    fetchProperties.execute({
      name: filters.name ,
      address: filters.address ,
      minPrice: Number(filters.minPrice),
      maxPrice: Number(filters.maxPrice),
    }).then(setProperties);
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Propiedades Disponibles</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input name="name" value={filters.name} onChange={handleChange} placeholder="Nombre" className="p-2 border rounded" />
        <input name="address" value={filters.address} onChange={handleChange} placeholder="Dirección" className="p-2 border rounded" />
        <input name="minPrice" type="number" value={filters.minPrice} onChange={handleChange} placeholder="Precio mínimo" className="p-2 border rounded" />
        <input name="maxPrice" type="number" value={filters.maxPrice} onChange={handleChange} placeholder="Precio máximo" className="p-2 border rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.idOwner} property={property} />
        ))}
      </div>
    </div>
  );
}
