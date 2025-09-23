import { FetchProperties } from '../../core/useCases/FetchProperties';

const mockRepo = {
  getAll: jest.fn().mockResolvedValue([{ name: 'Casa 1', idOwner: '1', address: 'Calle Falsa 123', price: 100000, image: '' }]),
  getById: jest.fn(),
};

test('debe retornar propiedades', async () => {
  const useCase = new FetchProperties(mockRepo);
  const result = await useCase.execute({});
  expect(result.length).toBe(1);
});
