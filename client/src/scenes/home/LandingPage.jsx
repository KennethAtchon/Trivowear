import React from 'react';
import ShoppingList from './ShoppingList'
import shoes from '../../assets/shoes.webp'
import shoes2 from '../../assets/shoes2.webp'

const LandingPage = () => {
  const filters = [
    'filters[Distinct][$eq]=LandingPage1'
  ]

  return (
    <>
      <div id="Hero" className="mt-20 w-auto h-auto">
        <img src={shoes} className="w-full h-[500px] object-cover" />
      </div>

      <div
        id="BestSellers"
        className="w-auto h-auto bg-[#EEEBE8] text-center py-20 px-20"
      >
        <p className="text-[48px] font-bold">Daily Essentials</p>
        <p className="text-[22px] mt-2 mb-4">Shop Shop Shop Shop Shop</p>
        <div>
          <ShoppingList filters={filters[0]} />
        </div>
      </div>

      <div id="BannerSection" className="w-auto h-auto ">
        <img src={shoes2} className="w-full h-[500px] object-cover" />
      </div>

      <div id="BestSellers2" className="w-auto h-auto bg-[#EEEBE8] text-center py-20 px-20">
        <p className="text-[48px] font-bold">Daily Essentials</p>
        <p className="text-[22px] mt-2 mb-4">Shop Shop Shop Shop Shop</p>
        <div>
          <ShoppingList filters={filters[0]} />
        </div>
      </div>

      <div id="BestSellerBanner" className='h-[300px] w-full relative'>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shoes2})`, opacity: 0.3 }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[48px] font-bold mb-4">Escape Into Beauty</p>
          <p className="text-[22px] font-bold mb-4">Vegan, cruelty-free skincare in recyclable packaging — to bring beauty, efficacy and simplicity to your daily routine</p>
          <button className="text-[24px] font-bold py-2 px-20 border-2">Shop Best Sellers</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

