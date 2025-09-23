import type { PropertyRepository } from '../../core/ports/PropertyRepository';
import type { Property } from '../../core/model/Property';
import axios from 'axios';
import { IFiltersProps } from 'services/GetProperties';

const API_URL = import.meta.env.VITE_API_URL;


export class ApiPropertyRepository implements PropertyRepository {
  async getAll(filters: IFiltersProps ): Promise<Property[]> {
    const cleanedFilters = cleanFilters(filters);
    const response = await axios.get(`${API_URL}/properties`, { params: cleanedFilters });
    return response.data;
  }

  async getById(id: string): Promise<Property | null> {
    const response = await axios.get(`${API_URL}/properties/${id}`);
    return response.data;
  }
}

function cleanFilters(filters: IFiltersProps) {
  const cleaned: Partial<IFiltersProps> = {};

  if (filters.name?.trim()) cleaned.name = filters.name.trim();
  if (filters.address?.trim()) cleaned.address = filters.address.trim();
  if (filters.minPrice !== undefined && filters.minPrice > 0) cleaned.minPrice = filters.minPrice;
  if (filters.maxPrice !== undefined && filters.maxPrice > 0) cleaned.maxPrice = filters.maxPrice;

  return cleaned;
}