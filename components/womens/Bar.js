import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Bar = ({ sortBy, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price, high to low", value: "price-high-to-low" },
    { label: "Price, low to high", value: "price-low-to-high" },
  ];

  const handleSort = (value) => {
    onSort(value);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 text-black">
      <div className="breadcrumb">
        <span className="text-gray-500">HOME</span>
        <span className="mx-2">/</span>
        <span className="font-bold">WOMEN'S</span>
      </div>
      
      <div className="relative">
        <button 
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Sort by: {sortOptions.find(option => option.value === sortBy)?.label}</span>
          <IoIosArrowDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSort(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bar;