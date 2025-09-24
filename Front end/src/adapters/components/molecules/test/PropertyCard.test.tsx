import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";
import PropertyCard from "../PropertyCard";

const mockProperty = {
  id: 1,
  name: "Casa Bonita",
  price: 1234567,
  address: "123 Calle Falsa, Springfield",
  images: [
    {
      idPropertyImage: "img1",
      idProperty: "1",
      file: "https://via.placeholder.com/150",
      enabled: true,
    },
  ],
  bedrooms: 3,
  bathrooms: 2,
  area: 150,
};

describe("PropertyCard component", () => {
  beforeEach(() => {
    render(<PropertyCard property={mockProperty} />);
  });

  it("renders property name", () => {
    expect(screen.getByText("Casa Bonita")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    expect(screen.getByText("$1,234,567")).toBeInTheDocument();
  });

  it("renders property address", () => {
    expect(screen.getByText(/123 Calle Falsa/i)).toBeInTheDocument();
  });

  it("renders bedrooms, bathrooms and area info", () => {
    expect(screen.getByText(/3 hab/i)).toBeInTheDocument();
    expect(screen.getByText(/2 baños/i)).toBeInTheDocument();
    expect(screen.getByText(/150 m²/i)).toBeInTheDocument();
  });

  it("renders image with correct alt text and src", () => {
    const img = screen.getByAltText("Casa Bonita") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe("https://via.placeholder.com/150");
  });

  it("renders 'Ver detalles' button", () => {
    expect(screen.getByRole("button", { name: /ver detalles/i })).toBeInTheDocument();
  });
});
