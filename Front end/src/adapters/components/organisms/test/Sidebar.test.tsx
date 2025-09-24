import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

jest.mock('../../../../assets/images/original.png', () => 'logo-mock');


describe('Sidebar component', () => {
  it('renders the logo image', () => {
    render(<Sidebar />);
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', expect.stringContaining('logo-mock'));
  });
});
