import React, { useState } from 'react';
import Filters from './Filters';
import ProductList from './ProductList';
import Bar from './Bar';

const MainWomen = ({ sortBy, onSort, products }) => {
  const [priceRange, setPriceRange] = useState([5, 200]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const clearAll = () => {
    setPriceRange([5, 200]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <div className="flex flex-col bg-white h-screen">
      <div className='flex h-full'>
        <div className='w-1/5 bg-green-200 flex flex-col items-end pt-4'>
          <div className='bg-gray-500 inline-block p-2 rounded'><Filters 
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  selectedSizes={selectedSizes}
  setSelectedSizes={setSelectedSizes}
  selectedColors={selectedColors}
  setSelectedColors={setSelectedColors}
  clearAll={clearAll}
/></div>
        </div>
        <div className='w-3/5 bg-blue-200 flex flex-col'>
          <div className='bg-red-200 flex-shrink-0'> <Bar sortBy={sortBy} onSort={onSort} /></div>
          <div className='bg-purple-200 flex-grow'>
            <div className='flex h-full'>
              <div className='bg-red-500 flex-grow'><ProductList 
            products={products}
/></div>
            </div>
          </div>
        </div>
        <div className='w-1/5 bg-green-200'>block3</div>
      </div>
    </div>
  );
};

export default MainWomen;


