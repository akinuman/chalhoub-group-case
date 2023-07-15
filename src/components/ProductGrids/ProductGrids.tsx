"use client";

import clsx from "clsx";
import type { Filters, TProduct } from "@/types/types";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import Select from "../Select/Select";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination/Pagination";

const COLUMN_OPTIONS = [3, 4, 5];
const BREAKPOINT = 1024;
const ITEMS_PER_PAGE = 6;

const ProductGrids = ({
  products,
  filters,
  handleSetDefault,
}: {
  products: TProduct[];
  filters: Filters;
  handleSetDefault: () => void;
}) => {
  const windowWidth = useWindowWidth();
  const [gridColumns, setGridColumns] = useState(
    windowWidth && windowWidth < BREAKPOINT ? 2 : 3
  );

  const searchParams = useSearchParams()!;
  const currentPage = Number(searchParams.get("page")) || 1;

  // Slice the products array to get only the products for the current page
  const productsForCurrentPage = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setGridColumns(windowWidth && windowWidth < BREAKPOINT ? 2 : gridColumns);
    if (windowWidth && windowWidth > BREAKPOINT && gridColumns === 2) {
      setGridColumns(3);
    }
  }, [windowWidth, gridColumns]);

  const handleColumnChange = (value: number) => {
    if (windowWidth && windowWidth >= BREAKPOINT) {
      setGridColumns(value);
    }
  };

  return (
    <div className="col-span-12 md:col-span-10">
      <div className="flex flex-col h-full min-h-[500px]">
        <div>
          <div className="flex ml-2.5 py-2.5 sm:px-2.5">
            <div className="flex items-center gap-5">
              <p>Min Price: ${filters.priceRange[0]}</p>
              <p>
                Max Price: $
                {filters.priceRange[1] === Infinity ? 0 : filters.priceRange[1]}
              </p>
              <button
                className="text-white p-1 px-2 hover:text-orange-700 transition-all duration-75 rounded-md\ flex items-center mr-2.5"
                onClick={handleSetDefault}
              >
                Set Default
              </button>
            </div>
            <Select
              options={COLUMN_OPTIONS}
              value={gridColumns}
              onChange={handleColumnChange}
            />
          </div>
          <ul
            className={clsx(
              "grid grid-flow-row gap-2.5 p-2.5 sm:gap-5 sm:p-5 flex-grow",
              {
                "grid-cols-2": gridColumns === 2,
                "grid-cols-3": gridColumns === 3,
                "grid-cols-4": gridColumns === 4,
                "grid-cols-5": gridColumns === 5,
              }
            )}
          >
            {productsForCurrentPage.length > 0 ? (
              productsForCurrentPage.map((product: TProduct) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <div className="flex flex-col p-2.5">
                <p>No products found.</p>
              </div>
            )}
          </ul>
        </div>
      </div>
      <Pagination products={products} />
    </div>
  );
};

export default ProductGrids;
