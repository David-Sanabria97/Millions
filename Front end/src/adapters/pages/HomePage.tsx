import { useEffect, useState } from 'react';
import { ApiPropertyRepository } from '../../infrastructure/api/ApiPropertyRepository';
import { FetchProperties } from '../../core/useCases/FetchProperties';
import { Property } from '../../core/model/Property';
import PropertyCard from '../components/molecules/PropertyCard';
import RangeSlider from '../components/atoms/RangeSlider';
import InputText from '../components/atoms/InputText';
import Grid from '@mui/material/Grid';
import Card from '../components/molecules/Card';
import { Box } from '@mui/material';
import { Search, MapPinIcon, DollarSignIcon, XIcon, BedIcon, BathIcon, SquareIcon } from 'lucide-react';
import Button from '../components/atoms/Button';
import Modal from '../components/molecules/Modal';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
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
    setFilters(prev => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  }

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
        <Modal open={!!property} > 
          <div >
            <div style={{ position: "relative", width: "100%", height: "300px", overflow: "hidden" }}>
              <img
                src={property?.images[0]?.file}
                alt={property?.name}
                width={"100%"}
                style={{borderRadius:"5px 5px 0 0", }}
              />
              <button
                onClick={() => {setProperty(null)}}
                style={{ position:"absolute", top: "16px", right: "16px",
                  background: "white", padding: "3px", borderRadius: "20px",
                  border: "none", cursor: "pointer",
                }}
                aria-label="Cerrar"
              >
                <XIcon size={20} />
              </button>
              <div 
                style={{ position:"absolute", bottom:"0px", left:"0px",   
                          background: "linear-gradient(to top, black, transparent)",
                          color: "white",
                        padding:" 1.5rem",
                        width:"100%",
                }}
              >
                <h2>{property?.name}</h2>
                <p>
                  <MapPinIcon size={18} />
                  {property?.address}
                </p>
              </div>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div  
                style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center",
                   marginBottom:"1.5rem"}}
              >
                <div>
                  {property?.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })}
                </div>
                <Grid container spacing={2} >
                  <Grid>
                    <BedIcon size={20} className="mr-2 text-gray-600" />
                    <span>{property?.bedrooms} habitaciones</span>
                  </Grid>
                  <Grid>
                    <BathIcon size={20} className="mr-2 text-gray-600" />
                    <span>{property?.bathrooms} baños</span>
                  </Grid>
                  <Grid>
                    <SquareIcon size={20} className="mr-2 text-gray-600" />
                    <span>{property?.area} m²</span>
                  </Grid>
                </Grid>
              </div>
              <div style={{borderTop: "1px solid #dfdedeff", paddingTop: "1.5rem"}}>
                <h3 >
                  Detalles de la propiedad
                </h3>
            
                <h3 >Descripción</h3>
                <div style={{display:"flex", gap:"1rem", justifyContent:"space-between"}}>
                    <Button 
                    color='secondary'
                  >
                     Agendar visita
                  </Button>
                   <Button 
                    color='primary'
                  >
                     Contactar agente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          {properties.map((property) => (
            <Grid size={{ xs: 12, md: 4 }}>
              <PropertyCard key={property.idOwner} property={property} openDetails={setProperty} />
            </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
