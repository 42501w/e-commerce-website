'use client'

import useCartStore from '@/store';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';


const CartIcon = () => {
  const { items } = useCartStore()
  return (
    
    <Link href={'/cart'} className=" group relative">
     
      <span className="absolute -top-2 -right-2 bg-black text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
        {items.length ? items.length : 0}
      </span>
      <FiShoppingCart size={20} className='group-hover:text-black hoverEffect' /> 
    </Link>
  );
};

export default CartIcon;
