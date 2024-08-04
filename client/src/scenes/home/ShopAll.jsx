import React from 'react';
import ShoppingList from './ShoppingList';
import shopall from "../../assets/shopallbg.jpg";
import { GrNext } from "react-icons/gr";
import Breadcrumbs from '@mui/material/Breadcrumbs';


const Shop = () => {
  const filters = ''; 

  return (
    <div>
      <div 
        id="home-page" 
        className='mx-20 bg-[#FAFAFA] relative'
        style={{ 
          backgroundImage: `url(${shopall})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px' // Adjust as needed
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <p className="text-4xl font-bold">
        <Breadcrumbs
          separator={<GrNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <div>Home</div>
          <div>Shop</div>
        </Breadcrumbs>


        </p>
          <h1 className="text-4xl font-bold text-[#000000] mt-10 pb-2">Shop Page</h1>
          <p className="mt-4 text-lg text-[#121212]">Let’s design the place you always imagined.</p>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='flex-1 bg-red-100'>dwadwadaw</div>
        <div className='flex-1 bg-red-200 flex flex-col'>
          <div className='flex justify-between bg-yellow-100'>
            <div className='bg-gray-300 p-2'>Category</div>
            <div className='bg-gray-300 p-2'>Sort By</div>
          </div>
          <ShoppingList filters={filters} />
        </div>
      </div>





    </div>
  );
};

export default Shop;
