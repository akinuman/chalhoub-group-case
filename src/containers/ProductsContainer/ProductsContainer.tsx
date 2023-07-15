"use client";

import { Filters, TProduct } from "@/types/types";
import ProductGrids from "../../components/ProductGrids/ProductGrids";
import { useEffect, useState, useMemo } from "react";
import FilterBar from "../../components/FilterBar/FilterBar";

const filterProducts = ({
  products,
  filters,
}: {
  products: TProduct[];
  filters: Filters;
}) => {
  return products.filter((product) => {
    return (
      (filters.color === "" || product.color === filters.color) &&
      filters.priceRange[0] <= product.price &&
      product.price <= filters.priceRange[1]
    );
  });
};

const ProductsContainer = ({ products }: { products: TProduct[] }) => {
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, Infinity],
    color: "",
  });

  const maxPrice = useMemo(
    () => Math.max(...products.map((product) => product.price)),
    [products]
  );
  const minPrice = useMemo(
    () => Math.min(...products.map((product) => product.price)),
    [products]
  );
  const colors = useMemo(
    () => Array.from(new Set(products.map((product) => product.color))),
    [products]
  );

  useEffect(() => {
    setFilteredProducts(filterProducts({ products, filters }));
  }, [filters, products, filteredProducts]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSetDefault = () => {
    setFilters({
      priceRange: [0, Infinity],
      color: "",
    });
  };

  return (
    <div className="grid grid-cols-12 w-full max-w-[1400px] mx-auto p-2.5 md:p-10">
      <FilterBar
        filters={filters}
        colors={colors}
        maxPrice={maxPrice}
        minPrice={minPrice}
        onFilterChange={handleFilterChange}
      />
      <ProductGrids
        products={filteredProducts}
        handleSetDefault={handleSetDefault}
        filters={filters}
      />
    </div>
  );
};

export default ProductsContainer;
