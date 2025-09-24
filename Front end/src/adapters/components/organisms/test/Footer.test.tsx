import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer component', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Millions. All rights reserved.`)).toBeInTheDocument();
  });
});
