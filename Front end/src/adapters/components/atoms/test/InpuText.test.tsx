import '@testing-library/jest-dom';

import { render, screen, fireEvent } from "@testing-library/react";
import InputText from "../InputText";  

describe("InputText component", () => {
  it("renders with placeholder and value", () => {
    render(<InputText placeholder="Nombre" value="Juan" />);

    const input = screen.getByPlaceholderText("Nombre") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Juan");

    expect(screen.getByText("Nombre")).toBeInTheDocument();
  });

  it("calls onChange handler when typing", () => {
    const handleChange = jest.fn();
    render(<InputText placeholder="Email" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders icon if provided", () => {
    const icon = <span data-testid="icon">Icono</span>;
    render(<InputText placeholder="Con icono" icon={icon} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("sets name attribute properly", () => {
    render(<InputText name="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("name", "email");
  });
});
