import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sneakers1 from '../../assets/sneakers1.jpg';
import soccer from '../../assets/soccer.jpeg';
import track from '../../assets/track.jpg';
import basketball from '../../assets/basketball.jpg';
import sneakers2 from '../../assets/sneakers2.jpg';
import { MdLocalShipping } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";
import ShoppingList from './ShoppingList';
import bowling from '../../assets/bowling.jpg';
import ReactStars from "react-rating-stars-component";

function Home() {
  const navigate = useNavigate();
  const filters = '&filters[Distinct][$eq]=LandingPage1';
  //&filters
  
  const images = [soccer, track, basketball];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  const startSlideShow = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  const nextSlide = () => {
    clearInterval(slideInterval.current);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startSlideShow();
  };

  const prevSlide = () => {
    clearInterval(slideInterval.current);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    startSlideShow();
  };

  useEffect(() => {
    startSlideShow();
    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <>
      <div className='h-auto w-full bg-black'>
        <div className='relative w-full h-[540px]'>
          <img
            src={sneakers1}
            alt="sneakers"
            className='w-full h-full object-cover'
          />
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
        </div>

        <div id='first-section' className='mx-16 mt-16 auto w-auto flex flex-col md:flex-row justify-between gap-x-2 relative z-10'>

          <div className='flex-[0_0_50%] max-w-[50%] flex flex-col justify-evenly'>
            <div className='max-w-fit text-start text-[60px] font-bold reem-kufi-ink leading-[55px] text-white'>
              Discover the Latest Sneakers Collection
            </div>
            <div className='mt-6 reem-kufi-ink text-white text-lg'>
              Explore our curated selection of cutting-edge sneakers designed for comfort and fashion. From iconic brands to the latest drops, elevate your sneaker game with exclusive styles available only at our store. Slide through to find your perfect pair and walk in confidence!
            </div>
            <div className='mt-8 flex justify-center'>
              <div id="button" className='bg-red-500 p-3 px-12 w-auto rounded-xl flex items-center justify-center reem-kufi-ink cursor-pointer text-lg' style={{ boxShadow: '0px 4px 8px rgba(255, 0, 0, 0.3)' }}>
                Shop Now
              </div>        
            </div>
          </div>

          <div className=' max-w-[700px] h-[600px] py-6 px-2'>

            <div className='w-full h-full bg-blue-300 rounded-[45px] relative overflow-hidden'>

              <div className='w-full h-full flex overflow-hidden'>
                {
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Slide"
                      className='w-full h-full object-cover shrink-0 grow-0'
                      style={{ translate: `${ -100 * currentIndex}%`,
                    transition: '0.3s ease-in-out',
                    }}
                    />
                  ))
                }
              </div>

              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-wrap justify-between items-center">
                <div
                  className="flex items-center justify-center bg-white border w-8 h-8 rounded-full shadow-md ml-4 opacity-75 cursor-pointer hover:opacity-100"
                  onClick={prevSlide}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <FaArrowLeft className="text-gray-500" />
                </div>
                <div
                  className="flex items-center justify-center border bg-white w-8 h-8 rounded-full shadow-md mr-4 opacity-75 cursor-pointer hover:opacity-100"
                  onClick={nextSlide}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <FaArrowRight className="text-gray-500" />
                </div>
              </div>

              <div id="slider" className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-2 mb-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-black' : 'bg-gray-400 hover:bg-gray-500'}`}
                    onClick={() => {
                      clearInterval(slideInterval.current);
                      setCurrentIndex(index);
                      startSlideShow();
                    }}
                  ></div>
                ))}
              </div>


            </div>


          </div>

        </div>



        <div id='imagebannerfiller' className='w-full h-[600px] mt-0 md:mt-0 relative flex justify-center items-end'>
        <div id="imagebanner" className='w-full h-[600px] absolute z-1 bottom-10 '>
          <img
              src={sneakers2}
              alt="sneakers"
              className='w-full h-full object-cover'
              style={{ filter: 'brightness(75%)', transform: ' skewY(-10deg)' }}
            />
          </div>

          <div id='benefits' className='p-12 md:p-16 bg-white absolute z-10 flex justify-between gap-x-6' style={{ 
            filter: 'brightness(90%)',
            boxShadow: "0 4px 21px rgba(231, 130, 130, 0.75)"
          }} >

            <div className='flex flex-col gap-4 items-center'>
              <div> < MdLocalShipping className='h-10 w-10'/> </div>
              <div className='reem-kufi-ink text-2xl'>Free Shipping</div>
            </div>

            <div className='flex flex-col gap-4 items-center'>
              <div> < FaClockRotateLeft className='h-10 w-10' /> </div>
              <div className='reem-kufi-ink text-2xl' >Easy Returns</div>
            </div>

            <div className='flex flex-col gap-4 items-center'>
              <div> < RiCustomerService2Fill  className='h-10 w-10'/> </div>
              <div className='reem-kufi-ink text-2xl'>Customer Service</div>
            </div>

          </div>

        </div>


        <div id="productsection" className="w-auto h-auto mb-12 mt-36 md:mt-44 lg:mt-52 xl:mt-60 mx-16">
          < ShoppingList filters={filters} />
        </div>

        <div className='w-auto h-[820px] mx-16 relative'>
          <img
            src={bowling}
            alt="sneakers"
            className='w-full h-full object-cover'
            style={{ filter: 'brightness(40%)'}}
          />
          
          <div className='absolute top-0 left-0 w-full h-full flex flex-col mt-28 items-center text-[#DD3131] gap-40 drop-shadow-[0px_0px_10px_rgba(255,0,0,1)]'>
            <div className='text-[36px] font-bold reem-kufi-ink  '>CATEGORIES</div> 
            <div className='text-[28px] flex flex-col md:flex-row items-center justify-between w-full px-0 gap-y-4 md:px-8'>
              <div className='reem-kufi-ink'>MEN'S</div>
              <div className='reem-kufi-ink'>WOMEN'S</div>
              <div className='reem-kufi-ink'>BOY'S</div>
              <div className='reem-kufi-ink'>GIRL'S</div>
            </div>
          </div>
        </div> 

        <div id='testimonials' className='w-auto h-auto mx-16 my-16 flex flex-row flex-wrap gap-8 relative justify-evenly'>
          <div className='w-[350px] h-[250px] bg-white flex flex-col justify-evenly items-center text-center rounded-2xl' style={{ filter: 'brightness(90%)'}}>
            <div>
              < ReactStars count={5} size={24} value={5} isHalf={true} edit={false} />
            </div>
            <div className='reem-kufi-ink'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi tempora quae nemo, porro unde quas iure doloremque inventore, fugiat esse sequi ab voluptatum. Dicta optio architecto animi velit provident cumque.</div>
            <div className='reem-kufi-ink text-xl' style={{ fontWeight: 'bold' }}> Jana D.</div>
            <div className='reem-kufi-ink text-green-500'>Verified Buyer</div>
          </div>

          <div className='w-[350px] h-[250px] bg-white flex flex-col justify-evenly items-center text-center rounded-2xl' style={{ filter: 'brightness(90%)'}}>
            <div>
              < ReactStars count={5} size={24} value={5} isHalf={true} edit={false} />
            </div>
            <div className='reem-kufi-ink'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi tempora quae nemo, porro unde quas iure doloremque inventore, fugiat esse sequi ab voluptatum. Dicta optio architecto animi velit provident cumque.</div>
            <div className='reem-kufi-ink text-xl' style={{ fontWeight: 'bold' }}> Jana D.</div>
            <div className='reem-kufi-ink text-green-500'>Verified Buyer</div>
          </div>

          <div className='w-[350px] h-[250px] bg-white flex flex-col justify-evenly items-center text-center rounded-2xl' style={{ filter: 'brightness(90%)'}}>
            <div>
              < ReactStars count={5} size={24} value={5} isHalf={true} edit={false} />
            </div>
            <div className='reem-kufi-ink'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi tempora quae nemo, porro unde quas iure doloremque inventore, fugiat esse sequi ab voluptatum. Dicta optio architecto animi velit provident cumque.</div>
            <div className='reem-kufi-ink text-xl' style={{ fontWeight: 'bold' }}> Jana D.</div>
            <div className='reem-kufi-ink text-green-500'>Verified Buyer</div>
          </div>


        </div>





      </div>
    </>
  );
}

export default Home;
