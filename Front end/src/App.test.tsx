import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./adapters/pages/HomePage', () => () => <div>Mock HomePage</div>);
jest.mock('./adapters/pages/PropertyDetailsPage', () => () => <div>Mock PropertyDetailsPage</div>);
jest.mock('./adapters/components/organisms/Sidebar', () => () => <div>Mock Sidebar</div>);
jest.mock('./adapters/components/organisms/Footer', () => () => <div>Mock Footer</div>);

describe('App routing', () => {
  it('renderiza la HomePage en la ruta raíz "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Mock HomePage')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
  });

  it('renderiza PropertyDetailsPage en la ruta "/property/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/property/123']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Mock PropertyDetailsPage')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
  });
});
