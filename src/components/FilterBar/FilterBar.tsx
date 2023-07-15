"use client";

import { Filters } from "@/types/types";
import Accordion from "../Accordion/Accordion";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { debounce } from "lodash";

const FilterBar = ({
  colors,
  onFilterChange,
  minPrice,
  maxPrice,
  filters,
}: {
  colors: string[];
  maxPrice: number;
  minPrice: number;
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
}) => {
  const handlePriceChange = debounce(
    (minPrice: number, maxPrice: number) => {
      onFilterChange({ priceRange: [minPrice, maxPrice] });
    },
    150,
    { leading: false, trailing: true }
  );

  return (
    <div className="p-4 col-span-12 md:col-span-3 mt-16">
      <h2 className="mb-4 text-lg font-bold">Filters</h2>
      <Accordion title="Color">
        <div className="flex flex-col gap-2.5 pt-2.5">
          <label className="cursor-pointer hover:text-orange-700 transition-colors duration-75">
            <input
              className="mr-2"
              type="radio"
              value=""
              checked={filters.color === ""}
              onChange={(e) => onFilterChange({ color: e.target.value })}
            />
            All
          </label>
          {colors.map((color, index) => (
            <label
              key={index}
              className="cursor-pointer hover:text-orange-700 transition-colors duration-75"
            >
              <input
                className="mr-2"
                type="radio"
                value={color}
                checked={filters.color === color}
                onChange={(e) => onFilterChange({ color: e.target.value })}
              />
              {capitalizeFirstLetter(color)}
            </label>
          ))}
        </div>
      </Accordion>
      <Accordion title="Price">
        <div className="flex flex-col gap-2.5 pt-2.5">
          <div className="flex flex-col">
            <label htmlFor="minPrice" className="pb-2">
              Min Price
            </label>
            <input
              id="minPrice"
              className="text-white cursor-pointer slider-orange"
              type="range"
              min={minPrice}
              max={maxPrice}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), maxPrice)
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="pb-2">
              Max Price
            </label>
            <input
              id="maxPrice"
              className="text-white cursor-pointer slider-orange"
              type="range"
              min={minPrice}
              max={maxPrice}
              onChange={(e) =>
                handlePriceChange(minPrice, Number(e.target.value))
              }
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default FilterBar;
