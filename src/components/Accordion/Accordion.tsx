"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0";
    }
  }, [isOpen]);

  return (
    <div className="w-full py-4 max-w-md md:mx-auto rounded-xl shadow-md overflow-hidden md:max-w-3xl ">
      <div className="flex flex-col flex-1">
        <div className="md:flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center text-white font-semibold text-left w-full hover:text-orange-700 transition-colors duration-75"
          >
            {title}
            <span
              className={clsx(
                "transition-transform font-bold duration-300 transform text-lg",
                {
                  "rotate-90": isOpen,
                }
              )}
            >
              →
            </span>
          </button>
        </div>
        <div
          ref={contentRef}
          className={`overflow-auto transition-max-height duration-500 ease-in-out ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
