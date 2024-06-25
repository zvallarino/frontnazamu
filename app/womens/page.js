'use client'

import { useState, useEffect } from "react";
import Sale from "@/components/Sale";
import MainWomen from "@/components/womens/MainWomen";
import { useAuth } from '../context/AuthContext';

export default function Page() {
  const [isSale, setIsSale] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const { user } = useAuth();

  useEffect(() => {
    const fetchWomensProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/?area=Womens');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Women\'s products:', data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching women\'s products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWomensProducts();
  }, []);

  const sortProducts = (sortType) => {
    let sortedProducts = [...products];
    switch(sortType) {
      case 'price-high-to-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-to-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
    setSortBy(sortType);
  };

  return (
    <div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <MainWomen sortBy={sortBy} onSort={sortProducts} products={products} />
    )}
  </div>
  );
}