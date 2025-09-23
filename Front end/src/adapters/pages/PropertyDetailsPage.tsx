import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApiPropertyRepository } from '../../infrastructure/api/ApiPropertyRepository';
import { Property } from '../../core/model/Property';

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;

    const repo = new ApiPropertyRepository();
    repo.getById(id).then(setProperty);
  }, [id]);

  if (!property) return <div className="p-4">Cargando propiedad...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
      <img src={property.image} alt={property.name} className="w-full h-96 object-cover mb-4" />
      <p><strong>Dirección:</strong> {property.address}</p>
      <p><strong>Precio:</strong> ${property.price.toLocaleString()}</p>
    </div>
  );
}
