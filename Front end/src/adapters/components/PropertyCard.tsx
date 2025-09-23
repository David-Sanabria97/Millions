import type { Property } from '../../core/model/Property';
import { Link } from 'react-router-dom'; 


interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <div className="border p-4 shadow rounded">
      <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{property.name}</h2>
      <p>{property.address}</p>
      <p className="text-green-600">${property.price}</p>
      <Link href={`/property/${property.idOwner}`}>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Ver detalles</button>
      </Link>
    </div>
  );
}
