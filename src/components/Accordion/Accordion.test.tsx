import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Accordion from "./Accordion";

describe("Accordion", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <Accordion title="Test Accordion">
        <div>Test Content</div>
      </Accordion>
    );

    expect(getByTestId("accordion")).toBeInTheDocument();
  });

  it("shows content when clicked", () => {
    const { getByText, queryByText } = render(
      <Accordion title="Test Accordion">
        <div>Test Content</div>
      </Accordion>
    );

    fireEvent.click(getByText("Test Accordion"));

    expect(queryByText("Test Content")).not.toHaveStyle("max-height: 0");
  });
});
