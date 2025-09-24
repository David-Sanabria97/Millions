import { BedIcon, BathIcon, SquareIcon, MapPinIcon } from 'lucide-react'

import Card from '../components/molecules/Card'
import Grid from '@mui/material/Grid'
import Button from './atoms/Button'

interface PropertyProps {
  property: {
    id: number
    name: string
    price: number
    address: string
    images:  {
                idPropertyImage: string,
                idProperty: string,
                file: string,
                enabled: boolean
            }[]
    bedrooms: number
    bathrooms: number
    area: number
  }
}
const PropertyCard = ({ property }: PropertyProps) => {
  const { name, price, address, images, bedrooms, bathrooms, area } = property
  // Format price with commas
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
  return (
    <Card >
      <div style={{ position: "relative", width: "100%" }}>
        <img
          width={"100%"}
          src={images[0]?.file}
          alt={name}
          style={{borderRadius:"5px 5px 0 0",}}
        />
        <div 
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "fit-content",
          background:"#060606", 
          color:"white", 
          borderRadius:"5px",
          fontSize:"14px", 
          padding:"5px",}}
        >
          {formattedPrice}
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:"1rem", padding:"0 1rem 1rem"}} >
        <h3 >{name}</h3>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0', borderBottom: "1px solid #dfdedeff" }}>
          <MapPinIcon size={16} className="mr-1 mt-1 flex-shrink-0" />
          <span className="line-clamp-2">{address}</span>
        </p>
        <Grid container spacing={2} >
          <Grid className="flex items-center">
            <BedIcon size={18} className="mr-1" />
            <span>{bedrooms} hab</span>
          </Grid>
          <Grid className="flex items-center">
            <BathIcon size={18} className="mr-1" />
            <span>{bathrooms} baños</span>
          </Grid>
          <Grid className="flex items-center">
            <SquareIcon size={18} className="mr-1" />
            <span>{area} m²</span>
          </Grid>
        </Grid>
        <Button  color='secondary' >
          Ver detalles
        </Button>
      </div>
    </Card>
  )
}
export default PropertyCard
