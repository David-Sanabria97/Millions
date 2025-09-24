import '@testing-library/jest-dom';
import axios from 'axios';
import { ApiPropertyRepository } from '../ApiPropertyRepository';
import { IFiltersProps } from 'services/GetProperties';
import { cleanFilters } from '../ApiPropertyRepository';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiPropertyRepository', () => {
  const repo = new ApiPropertyRepository();

  const mockProperty = {
    id: "1",
    name: 'Casa Bonita',
    price: 250000,
    address: 'Calle Falsa 123',
    images: [
      {
        idPropertyImage: '1',
        idProperty: '1',
        file: 'house.jpg',
        enabled: true
      }
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    idOwner: "101"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAll() should clean filters and call API with correct params', async () => {
    const filters: IFiltersProps = {
      name: '  Casa Bonita ',
      address: '',
      minPrice: 0,
      maxPrice: 0
    };

    mockedAxios.get.mockResolvedValueOnce({ data: [mockProperty] });

    const result = await repo.getAll(filters);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:5118/api/properties',
      {
        params: {
          name: 'Casa Bonita' // cleanFilters trims
        }
      }
    );

    expect(result).toEqual([mockProperty]);
  });

  it('debe limpiar los espacios en nombre y dirección', () => {
    const filters: IFiltersProps = {
      name: '  Casa Bonita  ',
      address: '  Calle Falsa 123  ',
      minPrice: 0,
      maxPrice: 0,
    };

    const result = cleanFilters(filters);

    expect(result).toEqual({
      name: 'Casa Bonita',
      address: 'Calle Falsa 123',
    });
  });
 it('debe incluir minPrice y maxPrice si son mayores a 0', () => {
    const filters: IFiltersProps = {
      name: '',
      address: '',
      minPrice: 100000,
      maxPrice: 300000,
    };

    const result = cleanFilters(filters);

    expect(result).toEqual({
      minPrice: 100000,
      maxPrice: 300000,
    });
  });

it('debe retornar solo los campos válidos', () => {
    const filters: IFiltersProps = {
      name: '  ',
      address: 'Av. Siempre Viva',
      minPrice: -100,
      maxPrice: 50000,
    };

    const result = cleanFilters(filters);

    expect(result).toEqual({
      address: 'Av. Siempre Viva',
      maxPrice: 50000,
    });
  });

  it('debe excluir minPrice y maxPrice si son 0 o undefined', () => {
    const filters: IFiltersProps = {
      name: '',
      address: '',
      minPrice: 0,
      maxPrice: 0,
    };

    const result = cleanFilters(filters);

    expect(result).toEqual({});
  });

  it('getById() should fetch property by ID', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProperty });

    const result = await repo.getById('1');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5118/api/properties/1');
    expect(result).toEqual(mockProperty);
  });
});
