"use client"

import React, { useState } from 'react';

const Filters = ({ priceRange, setPriceRange, selectedSizes, setSelectedSizes, selectedColors, setSelectedColors, clearAll }) => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['BEIGE', 'BLACK', 'BLUE', 'BROWN', 'CREAM', 'GREEN', 'RED', 'WHITE'];

  const handlePriceChange = (e) => {
    setPriceRange([parseInt(e.target.value), priceRange[1]]);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const isAnythingSelected = selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] !== 5;

  return (
    <div className="p-4 space-y-6 text-black bg-white">
      <div>
        <h2 
          className="font-bold text-lg mb-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Filters
          <svg 
            className={`w-5 h-5 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h2>
        <hr className="border-gray-300 mb-4" />
      </div>

      {isFiltersOpen && (
        <>
      <div>
        <h3 className="f mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <span>${priceRange[0]}</span>
          <input 
            type="range" 
            min="5" 
            max="200" 
            value={priceRange[0]} 
            onChange={handlePriceChange}
            className="w-full"
          />
          <span>$200</span>
        </div>
      </div>

      <div>
        <h3 
          className="mb-2 flex items-center cursor-pointer"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
        >
          Size
          <svg 
            className={`w-4 h-4 ml-1 transform transition-transform ${isSizeOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h3>
        {isSizeOpen && (
          <div className="space-y-2">
            {sizes.map(size => (
              <label key={size} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 
          className=" mb-2 flex items-center cursor-pointer"
          onClick={() => setIsColorOpen(!isColorOpen)}
        >
          Color
          <svg 
            className={`w-4 h-4 ml-1 transform transition-transform ${isColorOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h3>
        {isColorOpen && (
          <div className="space-y-2">
            {colors.map(color => (
              <label key={color} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="mr-2"
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>

      {isAnythingSelected && (
        <button 
          onClick={clearAll}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
        >
          Clear All
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Filters;