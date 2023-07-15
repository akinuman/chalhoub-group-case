"use client";

import { useState } from "react";

const Select = ({
  options,
  value,
  onChange,
}: {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: number) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="ml-auto z-50 md:relative px-2 hidden lg:block">
      <button
        className="bg-black text-white px-4 py-2 rounded-md hover:text-orange-700 transition-all duration-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value} Columns
      </button>

      <ul
        className={`absolute w-full bg-white mt-1 rounded-md shadow-lg transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {options.map((option, index) => (
          <li key={index}>
            <button
              className="block w-full px-4 py-2 text-left text-black hover:text-orange-700 rounded-md transition-colors duration-75"
              onClick={() => handleOptionClick(option)}
            >
              {option} Columns
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
