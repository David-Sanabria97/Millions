import axios from 'axios';
import { getProperties, getPropertyById, IFiltersProps } from '../GetProperties';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GetProperties service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProperties', () => {
    it('debería llamar a la API con los filtros correctos y retornar los datos', async () => {
      const mockFilters: IFiltersProps = {
        name: 'Casa',
        address: 'Calle 123',
        minPrice: 100000,
        maxPrice: 300000,
      };

      const mockResponse = { data: [{ id: 1, name: 'Casa' }] };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProperties(mockFilters);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5118/api/properties',
        { params: mockFilters }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getPropertyById', () => {
    it('debería llamar a la API con el ID correcto y retornar la propiedad', async () => {
      const mockId = '123';
      const mockResponse = { data: { id: mockId, name: 'Casa Grande' } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getPropertyById(mockId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5118/api/properties/123'
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
