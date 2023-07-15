"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center p-5 bg-black-800 text-white">
      <div className="w-20">
        <Image
          src="/logo.png"
          alt="Company Logo"
          priority
          width={100}
          height={100}
        />
      </div>
      <div>
        <button onClick={toggleMenu}>
          <FaBars
            size={24}
            className="hover:text-orange-700 duration-75 transition-colors"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;