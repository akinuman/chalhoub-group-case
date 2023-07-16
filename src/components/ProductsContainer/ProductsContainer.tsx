"use client";

import { Filters, TProduct } from "@/types/types";
import ProductGrids from "../ProductGrids/ProductGrids";
import { useEffect, useState, useMemo } from "react";
import FilterBar from "../FilterBar/FilterBar";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination/Pagination";

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

const ITEMS_PER_PAGE = 6;

const ProductsContainer = ({ products }: { products: TProduct[] }) => {
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<TProduct[]>([]);
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

  const searchParams = useSearchParams()!;
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const filtered = filterProducts({ products, filters });
    setFilteredProducts(filtered);
    const paginated = filtered.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    setPaginatedProducts(paginated);
  }, [filters, products, currentPage]);

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
        products={paginatedProducts}
        handleSetDefault={handleSetDefault}
        filters={filters}
      />
      <Pagination products={filteredProducts} />
    </div>
  );
};

export default ProductsContainer;
