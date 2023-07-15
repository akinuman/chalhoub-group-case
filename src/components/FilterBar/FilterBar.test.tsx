import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  const mockColors = ["black", "white"];
  const mockMinPrice = 0;
  const mockMaxPrice = 100;
  const mockFilters = { color: "", priceRange: [0, 100] as [number, number] };
  const mockOnFilterChange = jest.fn();

  jest.useFakeTimers();

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <FilterBar
        colors={mockColors}
        minPrice={mockMinPrice}
        maxPrice={mockMaxPrice}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(getByTestId("filter-bar")).toBeInTheDocument();
  });

  it("changes color filter on user interaction", () => {
    const { getByLabelText } = render(
      <FilterBar
        colors={mockColors}
        minPrice={mockMinPrice}
        maxPrice={mockMaxPrice}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );

    fireEvent.click(getByLabelText("Black"));

    expect(mockOnFilterChange).toHaveBeenCalledWith({ color: "black" });
  });
});
