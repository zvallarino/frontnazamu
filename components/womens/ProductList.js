// components/womens/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, priceRange, selectedSizes, selectedColors }) => {
  // In a real scenario, you would use these props to filter the products
  // For now, we'll just render 6 identical cards

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
  );
};

export default ProductList;