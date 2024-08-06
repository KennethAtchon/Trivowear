import React from 'react';
import ShoppingList from './ShoppingList'
import LandingImage from '../../assets/landingimage.jpg'
import Category1 from '../../assets/category1.jpg'
import Category2 from '../../assets/category2.jpg'
import Category3 from '../../assets/category3.jpg'
import { FaGreaterThan } from 'react-icons/fa';

const LandingPage = () => {
  const filters = [
    '&filters[Distinct][$eq]=LandingPage1'
  ]

  return (
    <>
      <div id="Hero" className="relative w-auto h-[700px] bg-cover bg-center" style={{ backgroundImage: `url(${LandingImage})` }}>
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="bg-[#FFF3E3] w-[640px] h-[445px] rounded-xl mr-40 flex justify-center">

            <div id="content" className='h-[350px] w-[560px] mt-16 flex flex-col'>
              <div className='text-[#333333] font-bold text-base' style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em' }}>
                <span className="mr-2"><b>Best</b></span>
                <span><b>Sellers</b></span>
              </div>
              
              <div className="font-poppins font-bold text-[52px] text-[#B88E2F]">
                Discover Our New Collection
              </div>

              <div className="font-poppins font-medium text-[15px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo saepe repellat aliquam, ut eaque, nisi exercitationem velit, laudantium minima repudiandae nihil asperiores recusandae est nulla sed sapiente nam molestias vero.
              </div>

              <div id="Buynowbutton" className="bg-[#B88E2F] text-white font-bold  text-[12px] rounded cursor-pointer h-[75px] w-[220px] flex justify-center items-center mt-auto" style={{ fontFamily: 'Poppins, sans-serif'}}>
                BUY NOW
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <div id="category-section" className="h-[935px] w-full pt-16 bg-[#FAFAFA]">
      <div id="box-section" className="mx-40 flex flex-col ">
        <div id="text-section" className="w-full h-[105px]">

          <h2
            className="font-[600] text-[30px] leading-[41.1px]  flex items-center justify-center"
            style={{ fontFamily: 'Noto Sans', marginBottom: '8px' }}
          >
            Customize Your Atmosphere
          </h2>

          <p
            className="font-[600] text-[12px] leading-[41.1px]  flex items-center justify-center"
            style={{ fontFamily: 'Noto Sans', marginBottom: '8px' }}
          >
            Browse all categories 
          </p>
        </div>
        
        <div id="image-section" className="w-full h-[670px] flex justify-center ">
          <div className="flex flex-col w-[568px] mr-10 rounded-xl relative">
            <div
              id="cat1"
              className="w-full h-[667px] rounded-xl relative overflow-hidden"
              style={{ backgroundImage: `url(${Category1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-bold">
                <div className="text-xl font-bold mb-2">Exercise</div>
                <div className="text-sm flex flex-row">
                  <p className='mr-2'>See Products</p> 
                  <FaGreaterThan size={12} className='mt-1'/> 
                </div>

              </div>
            </div>
          </div>

          <div className="flex flex-col w-[568px] relative">
            <div
              id="cat2"
              className="w-full h-[318px]  mb-8 rounded-xl relative overflow-hidden"
              style={{ backgroundImage: `url(${Category2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-bold">
                <div className="text-xl font-bold mb-2">Coffee Machines</div>
                  <div className="text-sm flex flex-row">
                    <p className='mr-2'>See Products</p> 
                    <FaGreaterThan size={12} className='mt-1'/> 
                  </div>
                </div>
            </div>
            <div
              id="cat3"
              className="w-full h-[318px]  rounded-xl relative overflow-hidden"
              style={{ backgroundImage: `url(${Category3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-bold">
                <div className="text-xl font-bold mb-2">Home Care</div>
                  <div className="text-sm flex flex-row">
                    <p className='mr-2'>See Products</p> 
                    <FaGreaterThan size={12} className='mt-1'/> 
                  </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>

    <div id="product-section" className='w-full '>
      <div className='mx-10 md:mx-20 lg:mx-30 xl:mx-40'>
      <h2
            className="font-[600] text-[30px] leading-[41.1px] mt-10 flex items-center justify-center text-[#3A3A3A] mb-10"
            style={{ fontFamily: 'Noto Sans' }}
      >
            Best Sellers
      </h2>
      <ShoppingList filters={filters} />

      </div>
    </div>

<div id="banner-section" className='h-auto bg-[#FAFAFA]'>
      <div id="banner" className='lg:mx-20 xl:mx-40 2xl:mx-60 h-full flex flex-col md:flex-row gap-x-8 py-20 m-4 md:mx-20'>

        <div className='relative flex-1 md:mb-0 mb-5'>
          <div 
            className='absolute inset-0' 
            style={{ 
              backgroundImage: `url(${Category1})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          ></div>
          <div className="absolute inset-0 bg-white opacity-50"></div> {/* Lightening overlay */}
          <div className='relative z-10 p-4 flex flex-col items-end mr-12 my-6 '>
            <div className='text-[14px] text-[#737373] font-bold'> Ends Today</div>
            <div className='text-[40px]  text-[#252B42] font-bold max-w-[200px] text-right'>Elements Style</div>
            <div className='text-[12px]  text-[#252B42] font-bold'> Explore Items</div>
          </div>
        </div>

        <div className='relative flex-1'>
          <div 
            className='absolute inset-0' 
            style={{ 
              backgroundImage: `url(${Category2})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          ></div>
          <div className="absolute inset-0 bg-white opacity-50"></div> {/* Lightening overlay */}
            <div className='relative z-10 p-4 flex flex-col items-end mr-12 my-6 '>
              <div className='text-[14px] text-[#737373] font-bold'>Your Space</div>
              <div className='text-[40px]  text-[#252B42] font-bold max-w-[200px] text-right'>Unique Life</div>
              <div className='text-[12px]  text-[#252B42] font-bold'> Explore Items</div>
            </div>
        </div>

      </div>
    </div>



    </>
  );
}

export default LandingPage;

