import axios from 'axios';

const API_BASE = "http://localhost:5118/api";


export interface IFiltersProps{
    name?:string;
    address?:string;
    minPrice?:number;
    maxPrice?:number;
}

export const getProperties = async (filters:IFiltersProps) => {
  const response = await axios.get(`${API_BASE}/properties`, {
    params: filters,
  });
  return response.data;
};

export const getPropertyById = async (id:string) => {
  const response = await axios.get(`${API_BASE}/properties/${id}`);
  return response.data;
};
