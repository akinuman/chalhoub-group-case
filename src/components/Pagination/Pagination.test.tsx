import { render, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (useSearchParams as jest.Mock).mockReturnValueOnce({
      get: jest.fn().mockReturnValue(null),
    });

    const { getByText } = render(<Pagination products={[]} />);
    const previousButton = getByText("Previous");
    const nextButton = getByText("Next");

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("navigates to the previous page when the previous button is clicked", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValueOnce({
      get: jest.fn().mockReturnValue("2"),
    });

    const { getByText } = render(<Pagination products={[]} />);
    const previousButton = getByText("Previous");

    fireEvent.click(previousButton);

    expect(mockPush).toHaveBeenCalledWith("?page=1");
  });

  it("navigates to the next page when the next button is clicked", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValueOnce({
      get: jest.fn().mockReturnValue("2"),
    });

    const { getByText } = render(<Pagination products={[]} />);
    const nextButton = getByText("Next");

    fireEvent.click(nextButton);

    expect(mockPush).toHaveBeenCalledWith("?page=2");
  });

  it("disables the previous button on the first page", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (useSearchParams as jest.Mock).mockReturnValueOnce({
      get: jest.fn().mockReturnValue("1"), // Assume current page is 1
    });

    const { getByText } = render(<Pagination products={[]} />);
    const previousButton = getByText("Previous");

    expect(previousButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (useSearchParams as jest.Mock).mockReturnValueOnce({
      get: jest.fn().mockReturnValue("3"), // Assume current page is 3
    });

    const { getByText } = render(<Pagination products={[]} />);
    const nextButton = getByText("Next");

    expect(nextButton).not.toBeDisabled();
  });
});
