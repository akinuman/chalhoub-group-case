import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders without crashing", () => {
    const { getByAltText } = render(<Header />);
    const logoImage = getByAltText("Company Logo");
    expect(logoImage).toBeInTheDocument();
  });
});
