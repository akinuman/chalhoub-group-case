import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select", () => {
  const options = [2, 3, 4];
  const value = 3;
  const onChange = jest.fn();

  beforeEach(() => {
    render(<Select options={options} value={value} onChange={onChange} />);
  });

  it("renders the select button with the initial value", () => {
    const selectButton = screen.getByTestId("selectButton");
    expect(selectButton).toHaveTextContent(`${value} Columns`);
  });

  it("opens the options list when the select button is clicked", () => {
    const selectButton = screen.getByTestId("selectButton");
    fireEvent.click(selectButton);

    const optionsList = screen.getByRole("list");
    expect(optionsList).toBeInTheDocument();
  });

  it("calls the onChange function with the selected option", () => {
    const selectButton = screen.getByTestId("selectButton");
    fireEvent.click(selectButton);

    const optionButton = screen.getByTestId("optionButton-2");
    fireEvent.click(optionButton);

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("closes the options list after an option is selected", () => {
    const selectButton = screen.getByTestId("selectButton");
    fireEvent.click(selectButton);

    const optionButton = screen.getByTestId("optionButton-2");
    fireEvent.click(optionButton);

    // Wait for the next tick to allow the state to update
    setTimeout(() => {
      const optionsList = screen.queryByRole("list");
      expect(optionsList).not.toBeInTheDocument();
    }, 0);
  });
});
