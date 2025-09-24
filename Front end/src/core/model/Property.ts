export interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  images:{ file: string }[] ;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description?: string;
}
