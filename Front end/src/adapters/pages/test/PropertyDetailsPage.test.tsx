import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import PropertyDetailsPage from '../PropertyDetailsPage';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../infrastructure/api/ApiPropertyRepository');

import { useParams } from 'react-router-dom';
import { ApiPropertyRepository } from '../../../infrastructure/api/ApiPropertyRepository';

describe('PropertyDetailsPage', () => {
  const mockProperty = {
    id: '123',
    name: 'Casa Bonita',
    image: 'casa.jpg',
    address: 'Av. Siempre Viva 123',
    price: 250000,
  };

  beforeEach(() => {
    // @ts-ignore
    useParams.mockReturnValue({ id: '123' });

    (ApiPropertyRepository as jest.Mock).mockImplementation(() => ({
      getById: jest.fn().mockResolvedValue(mockProperty),
    }));
  });

  test('muestra el texto de carga inicialmente', () => {
    render(<PropertyDetailsPage />);
    expect(screen.getByText(/Cargando propiedad/i)).toBeInTheDocument();
  });

  
  test('muestra el texto de carga inicialmente sin id', () => {
    // @ts-ignore
    useParams.mockReturnValue({ id: undefined });
    render(<PropertyDetailsPage />);
    expect(screen.getByText(/Cargando propiedad/i)).toBeInTheDocument();
  });

  test('muestra la propiedad una vez cargada', async () => {
    render(<PropertyDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    });

    expect(screen.getByAltText(mockProperty.name)).toHaveAttribute('src', mockProperty.image);
    expect(screen.getByText(new RegExp(mockProperty.address, 'i'))).toBeInTheDocument();
  });
});
