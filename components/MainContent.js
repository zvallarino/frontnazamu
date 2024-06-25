import Link from 'next/link';
import React from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

// https://i.pinimg.com/originals/b4/59/26/b4592635d6855ea30e1d652b846fb3df.jpg

const ShopButton = () => {
    return (
      <Link href="/womens" className="button-46 flex items-center justify-center bg-gray-100 bg-opacity-26 border border-gray-300 rounded-lg text-black cursor-pointer text-lg leading-7 max-w-full p-3.5 md:text-xl md:min-w-[200px] md:px-4 md:py-3 transition duration-200 ease-in-out hover:bg-white hover:border-black hover:border-opacity-19 active:outline-none">
          SHOP NOW
      </Link>
    );
  };

const MainContent = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?cs=srgb&dl=pexels-sanaan-3075993.jpg&fm=jpg')" }}>
      <div className="absolute inset-0 flex justify-between items-center p-4">
        <button className="p-2 bg-gray-200"><FaChevronLeft />
        </button>
        <button className="p-2 bg-gray-200"><FaChevronRight />
        </button>
      </div>
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <div className="">Box 1</div>
        <div className="bg-green-500">

        </div>
        <div className="flex border-2">            
            <div className='bg-red-200 w-3/5'>
                <div className='text-6xl font-extrabold'>LET'S GO TO BRUNCH</div>
                <div className='text-2xl ' >DRESSES FOR YOUR SUMMER PLANS</div>
                <ShopButton />

            </div>
            <div className='bg-yellow-200'></div>
        </div>
        <div className="bg-yellow-500">Box 4</div>
      </div>
    </div>
  );
};

export default MainContent;

