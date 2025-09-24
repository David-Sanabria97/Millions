import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";
import Card from "../Card"; 

describe("Card component", () => {
  it("renders children correctly", () => {
    render(<Card>Contenido de prueba</Card>);
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });

  it("applies the passed style prop", () => {
    const style = { backgroundColor: "red" };
    render(<Card style={style}>Contenido</Card>);
    const cardElement = screen.getByText("Contenido").parentElement;
    expect(cardElement).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  });
});
