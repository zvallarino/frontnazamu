'use client'

import { useAuth } from '../app/context/AuthContext';

const Sale = () => {
  const { isSaleVisible, toggleSaleBanner } = useAuth();

  if (!isSaleVisible) return null;

  return (
    <div className="bg-red-500 text-white text-center py-2 relative">
      Sale Now On! 20% Off Storewide
      <button 
        onClick={toggleSaleBanner} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        ✕
      </button>
    </div>
  );
};

export default Sale;