import '@testing-library/jest-dom';

import { render, screen, fireEvent } from "@testing-library/react";
import RangeSlider from "../RangeSlider"; 

describe("RangeSlider component", () => {
  it("renders with placeholder and initial values", () => {
    const handleChangeValue = jest.fn();
    render(
      <RangeSlider
        placeholder="Rango de precio"
        min={0}
        max={10000}
        handleChangeValue={handleChangeValue}
      />
    );

     const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBe(2); 

    fireEvent.change(sliders[0], { target: { value: 3000 } });
    expect(screen.getByText("Rango de precio")).toBeInTheDocument();
    expect(screen.getByText(/min 0/)).toBeInTheDocument();
  });

  

  it("renders icon if provided", () => {
    const icon = <span data-testid="icon">Icono</span>;
    render(
      <RangeSlider
        placeholder="Rango"
        min={0}
        max={10000}
        handleChangeValue={() => {}}
        icon={icon}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
