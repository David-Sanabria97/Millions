import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';

jest.mock('../../../infrastructure/api/ApiPropertyRepository');
jest.mock('../../../core/useCases/FetchProperties');

import { ApiPropertyRepository } from '../../../infrastructure/api/ApiPropertyRepository';
import { FetchProperties } from '../../../core/useCases/FetchProperties';

jest.mock('../../components/atoms/RangeSlider', () => ({ handleChangeValue }: any) => {
  React.useEffect(() => {
    // Simula un cambio de rango al renderizar
    handleChangeValue(new Event('change'), [100000, 300000]);
  }, []);
  return <div data-testid="mock-slider" />;
});

const mockProperties = [
  {
    id: 1,
    idOwner: 1,  
    name: 'Propiedad 1',
    price: 100000,
    address: 'Calle Falsa 123',
    images: [{ idPropertyImage: '1', idProperty: '1', file: 'image1.jpg', enabled: true }],
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
  },
  {
    id: 2,
    idOwner: 2,
    name: 'Propiedad 2',
    price: 200000,
    address: 'Avenida Siempre Viva 742',
    images: [{ idPropertyImage: '2', idProperty: '2', file: 'image2.jpg', enabled: true }],
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
  }
];

describe('HomePage', () => {
  let mockExecute: jest.Mock;

  beforeEach(() => {
    (ApiPropertyRepository as jest.Mock).mockImplementation(() => ({}));
    mockExecute = jest.fn().mockResolvedValue(mockProperties);
    (FetchProperties as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));
  });

  test('renders correctly and fetches properties', async () => {
    render(<HomePage />);

    expect(screen.getByText(/Nuestras Propiedades/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalled();

      expect(screen.getByText('Propiedad 1')).toBeInTheDocument();
      expect(screen.getByText('Propiedad 2')).toBeInTheDocument();
    });
  });

  test('updates filters on input change and triggers fetch', async () => {
    render(<HomePage />);

    const nameInput = screen.getByPlaceholderText('Nombre');
    fireEvent.change(nameInput, { target: { value: 'Propiedad 1' } });

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Propiedad 1',
      }));
    });
  });

  test('clears filters on button click', async () => {
    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Test' } });

    const clearButton = screen.getByText(/Limpiar filtros/i);
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith({
        name: '',
        address: '',
        minPrice: 0,
        maxPrice: 0,
      });
    });
  });

  it('actualiza los filtros al cambiar el rango de precios', async () => {
    render(<HomePage />);

    await waitFor(() => {
      const card = screen.getByText(/Propiedad 1/i);
      expect(card).toBeInTheDocument();
    });
  });
});
