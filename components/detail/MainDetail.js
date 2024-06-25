import React, { useState, useMemo } from 'react';
import Image from 'next/image';

const MainDetail = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

    // Create a Set of unique colors and convert back to array
    const uniqueColors = useMemo(() => {
      return [...new Set(product.colors.map(color => color.toLowerCase()))];
    }, [product.colors]);

    const uniqueSizes = useMemo(() => {
      return [...new Set(product.sizes)];
    }, [product.sizes]);
  
    const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex bg-white h-screen">
      <div className='w-1/4 bg-blue-200'>Block 1</div>
      <div className='w-2/4 flex bg-grey-200 p-4 border-2 border-purple-500 text-black'> 
        <div className="mb-4 border-2 border-green-500 w-1/2 flex">
          <div className="flex flex-col mr-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                className={`w-3.5 h-3.5 rounded-full my-1 ${selectedImage === index ? 'bg-gray-300' : 'bg-white border-2 border-gray-300'}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
          <div className="relative flex-grow" style={{height: '833px', width: '416px'}}>
            <Image
              src={product.images[selectedImage].image_url || product.images[selectedImage].image}
              alt={product.images[selectedImage].alt_text}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className='border-2 border-orange-500 w-1/2 p-6'>
          <p className="text-sm text-gray-500">HOME / {product.areas.join(' / ')}</p>
          <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <svg key={index} className={`w-4 h-4 ${index < Math.round(product.ave_of_reviews) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">{product.num_of_reviews} Reviews</span>
          </div>
          <p className="text-xl font-bold mt-2">${product.price}</p>
          <div className="mt-4">
            <p className="font-bold">Color:</p>
            <div className="flex mt-2">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full mx-1 border-2 ${color.toLowerCase() === 'white' ? 'border-gray-300' : ''} ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold">Size:</p>
            <div className="flex mt-2">
            {allSizes.map((size) => {
      const isAvailable = uniqueSizes.includes(size);
      return (
        <button
          key={size}
          className={`
            border px-3 py-1 mx-1 relative
            ${selectedSize === size ? 'bg-black text-white' : ''}
            ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
          `}
          onClick={() => isAvailable && setSelectedSize(size)}
          disabled={!isAvailable}
        >
          {size}
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-t border-red-500 w-full absolute" style={{ transform: 'rotate(-45deg)' }}></div>
            </div>
          )}
        </button>
      );
    })}
            </div>
          </div>
          <p className="text-sm text-blue-500 mt-2 cursor-pointer">Size Guide</p>
          <div className="flex mt-4">
            <button
              className={`flex-grow py-2 px-4 ${selectedColor && selectedSize ? 'bg-black text-white' : 'bg-gray-300'}`}
            >
              {selectedColor && selectedSize ? 'ADD TO CART' : 'PLEASE SELECT A COLOR AND SIZE'}
            </button>
            <button className="ml-2 p-2 border">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <hr className="my-4" />
          <div>
            <button
              className="flex justify-between items-center w-full"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <span className="font-bold">Description</span>
              <svg className={`w-4 h-4 transform ${isDescriptionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDescriptionOpen && (
              <p className="mt-2">{product.description}</p>
            )}
          </div>
          <hr className="my-4" />
          <div>
            <button
              className="flex justify-between items-center w-full"
              onClick={() => setIsMaterialsOpen(!isMaterialsOpen)}
            >
              <span className="font-bold">Materials and Care</span>
              <svg className={`w-4 h-4 transform ${isMaterialsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMaterialsOpen && (
              <div className="mt-2">
                <p>Materials: {product.materials.join(', ')}</p>
                <p>Care: {product.wash_instructions.join(', ')}</p>
              </div>
            )}
          </div>
          <hr className="my-4" />
          <p className="font-bold">Reviews</p>
        </div>
      </div>
      <div className='w-1/4 bg-blue-200'>Block 3</div>
    </div>
  );
};

export default MainDetail;