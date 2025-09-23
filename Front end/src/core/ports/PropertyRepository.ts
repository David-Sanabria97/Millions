import type { Property } from '../model/Property';

export interface PropertyRepository {
  getAll(filters: {
    name?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]>;

  getById(id: string): Promise<Property | null>;
}

