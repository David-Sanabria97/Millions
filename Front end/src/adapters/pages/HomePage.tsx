import { useEffect, useState } from 'react';
import { ApiPropertyRepository } from '../../infrastructure/api/ApiPropertyRepository';
import { FetchProperties } from '../../core/useCases/FetchProperties';
import { Property } from '../../core/model/Property';
import PropertyCard from '../components/PropertyCard';
import RangeSlider from '../components/atoms/RangeSlider';
import InputText from '../components/atoms/InputText';
import Grid from '@mui/material/Grid';
import Card from '../components/molecules/Card';
import { Box } from '@mui/material';
import { Search, MapPinIcon, DollarSignIcon, AlignCenter } from 'lucide-react';
import Button from '../components/atoms/Button';


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

  const handleChangeRange = (e: Event, newValue: number[]) => {
    if (Array.isArray(newValue)) {
    setFilters(prev => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  } }

  return (
     <>
      <h1 className="text-3xl font-bold mb-4" style={{textAlign:"center"}}>Nuestras Propiedades</h1>

      <Box style={{ padding: "0 6rem"}} >
        <Card style={{ padding: "1rem"}}>
            <h3 className="text-xl font-semibold mb-4">Filtros</h3> 
            <Grid container spacing={2}  alignItems={"center"}>
              <Grid size={{ xs: 12, md: 3 }} > 
                  <InputText name="name" value={filters.name} onChange={handleChange} placeholder="Nombre" icon={ <Search  size="16" color="#060606" /> } />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }} > 
                  <InputText name="address" value={filters.address} onChange={handleChange} placeholder="Dirección"icon={ <MapPinIcon  size="16" color="#060606" /> }  /> 
              </Grid>
              <Grid size={{ xs: 12, md: 3 }} >
                  <RangeSlider handleChangeValue={handleChangeRange} placeholder="Precio"  step={1000} min={0} max={500000} icon={ <DollarSignIcon  size="16" color="#060606" /> }/>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }} >
                  <Button 
                    color='secondary'
                    onClick={() =>  setFilters({name: "",
                          address: "",
                          minPrice: 0,
                          maxPrice: 0,})}
                  >
                    Limpiar filtros
                  </Button>
              </Grid>
            </Grid>
        </Card>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          {properties.map((property) => (
            <Grid size={{ xs: 12, md: 4 }}>
              <PropertyCard key={property.idOwner} property={property} />
            </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
