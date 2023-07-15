import ProductsContainer from "@/components/ProductsContainer/ProductsContainer";
import { TProduct } from "../types/types";
import PromotionalBanner from "@/components/PromotionalBanner/PromotionalBanner";

export default async function ProductsPage() {
  const resp = await fetch(`https://fakestoreapi.com/products`);
  const rawProducts = await resp.json();
  const colors = ["red", "blue", "green", "yellow"];

  // Add random color to each product for demo purposes
  const products = rawProducts.map((product: TProduct) => ({
    ...product,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <main className="flex w-full flex-col cursor-default">
      <PromotionalBanner
        header="Chalhoub Group"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <ProductsContainer products={products} />
    </main>
  );
}
