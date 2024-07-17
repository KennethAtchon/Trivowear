import React from 'react';
import ShoppingList from './ShoppingList'

const LandingPage = () => {
  const filters = [
    'filters[Distinct][$eq]=LandingPage1'
  ]

  return (
    <>
    <div id="Hero" className="w-auto h-auto grid grid-cols-2">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s" className="w-full h-full object-cover" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s" alt="Placeholder 2" className="w-full h-full object-cover" />
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

    <div id="BannerSection" className="w-auto h-auto grid grid-cols-2">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s" className="w-full h-full object-cover" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s" alt="Placeholder 2" className="w-full h-full object-cover" />
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
        style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s')` }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[48px] font-bold mb-4">Escape Into Beauty </p>
        <p className="text-[22px] font-bold mb-4">Vegan, cruelty-free skincare in recyclable packaging — to bring beauty, efficacy and simplicity to your daily routine</p>
        <button className=" text-[24px] font-bold py-2 px-20 border-2">Shop Best Sellers </button>
      </div>
    </div>



    </>

  );
}

export default LandingPage;
