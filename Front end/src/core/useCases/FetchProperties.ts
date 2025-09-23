import type { PropertyRepository } from '../ports/PropertyRepository';
import type { Property } from '../model/Property';

export class FetchProperties {
  constructor(private readonly repo: PropertyRepository) {}

  async execute(filters: {
    name?: string ;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]> {
    return await this.repo.getAll(filters);
  }
}
