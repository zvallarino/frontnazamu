// components/womens/ProductCard.js
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const [hoveredColor, setHoveredColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const uniqueColors = useMemo(() => {
    return [...new Set(product.colors.map(color => color.toLowerCase()))];
  }, [product.colors]);

  return (
    <Link href={`/womens/${product.sku}`} passHref>
      <div
        className="relative w-full max-w-sm mx-auto text-black cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative pb-[200%]">
          <Image
            src={product.images[0]?.image_url || product.images[0]?.image || "https://via.placeholder.com/400"}
            alt={product.images[0]?.alt_text || product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {isHovered && (
            <button 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                // Handle quick view logic here
              }}
            >
              Quick View
            </button>
          )}
        </div>
        <div className="p-3 flex justify-between items-start bg-white rounded-b-lg shadow">
          <div>
            <h2 className="font-bold text-base">{product.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{product.sku}</p>
            <div className="flex mt-2 space-x-2 ">
              {uniqueColors.map((color, index) => (
                <div
                  key={index}
                  className="relative "
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  {hoveredColor === color && (
                    <div className="absolute top-0 left-0 w-5 h-5 rounded-full border-2 border-gray-400"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-base">${product.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;