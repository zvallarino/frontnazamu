'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';

const Toolbar = ({ isSale }) => {
  const [currency, setCurrency] = useState('USD');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="relative flex justify-between items-center py-4 border-2 border-yellow-300 bg-green-200 text-black">
      <div className="flex items-center space-x-4 border-green-200 border-2 p-2 ">
        <div className="relative">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${currency === 'USD' ? 'block' : 'hidden'}`}>
                <Image src="/images/usa.png" alt="USA Flag" width={32} height={32} className="rounded-full" />
              </div>
              <div className={`w-8 h-8 ${currency === 'CAD' ? 'block' : 'hidden'}`}>
                <Image src="/images/canada.png" alt="Canada Flag" width={32} height={32} className="rounded-full" />
              </div>
              <span className='text-xs'>{currency === 'USD' ? '(USD)' : '(CAD)'}</span>
            </div>
          </div>
          {dropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div 
                className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100" 
                onClick={() => handleCurrencyChange('USD')}
              >
                <div className="w-8 h-8">
                  <Image src="/images/usa.png" alt="USA Flag" width={32} height={32} className="rounded-full" />
                </div>
                <span>(USD)</span>
              </div>
              <div 
                className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100" 
                onClick={() => handleCurrencyChange('CAD')}
              >
                <div className="w-8 h-8">
                  <Image src="/images/canada.png" alt="Canada Flag" width={32} height={32} className="rounded-full" />
                </div>
                <span>(CAD)</span>
              </div>
            </div>
          )}
        </div>
        <span>|</span>
        <div className='text-xs'>ORDER STATUS</div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex items-center space-x-2">
          <div className="w-24 h-12 relative">
            <Image src="/images/weeb.png" alt="Logo" layout="fill" objectFit="contain" />
          </div>
          <Link href="http://localhost:3000/" className='text-3xl font-bold pointer-events-auto'>
      Weebo
    </Link>
        </div>
        <nav className="flex space-x-4 pointer-events-auto mt-2">
          <Link href="/new">NEW</Link>
          <Link href="/womens">WOMEN'S</Link>
          <Link href="/mens">MEN'S</Link>
          <Link href="/accessories">ACCESSORIES</Link>
          <Link href="/shop-instagram">SHOP INSTAGRAM</Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4 border-green-200 border-2 p-2">
        <div className="flex items-center space-x-2">
          <CiSearch className="text-xl" />
          <input type="text" placeholder="Search..." className="border-b-2 border-gray-300 focus:outline-none" />
        </div>
        <span>|</span>
        <GoPerson className="text-xl cursor-pointer" onClick={handleProfileClick} />
        {user && (
          <>
            <span>|</span>
            <button onClick={handleLogout} className="text-sm">Logout</button>
          </>
        )}
        <span>|</span>
        <HiOutlineShoppingBag className="text-xl" />
      </div>
    </div>
  );
};

export default Toolbar;