import { render } from "@testing-library/react";
import ProductCard from "./ProductCard";

const mockProduct = {
  id: 1,
  title: "Product",
  description: "Lorem ipsum dolor sit amet",
  price: 9.99,
  category: "Category",
  color: "Color",
  image: "/image.jpg",
  rating: {
    rate: 4.5,
    count: 5,
  },
};

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    const { getByText, getByAltText } = render(
      <ProductCard product={mockProduct} />
    );

    const titleElement = getByText("Product");
    const descriptionElement = getByText("Lorem ipsum dolor sit amet");
    const priceElement = getByText("$9.99");
    const imageElement = getByAltText("Product");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
