import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sneakers1 from '../../assets/sneakers1.jpg';
import soccer from '../../assets/soccer.jpeg';
import track from '../../assets/track.jpg';
import basketball from '../../assets/basketball.jpg';

function Home() {
  const navigate = useNavigate();
  
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

        <div id='first-section' className='mx-16 mt-16 auto w-auto flex flex-row justify-between gap-x-2'>

          <div className='flex-[0_0_50%] max-w-[50%] flex flex-col justify-evenly'>
            <div className='max-w-fit text-start text-[60px] font-bold reem-kufi-ink leading-[50px] text-white'>
              Discover the Latest Sneakers Collection
            </div>
            <div className='mt-6 reem-kufi-ink text-white text-lg'>
              Explore our curated selection of cutting-edge sneakers designed for comfort and fashion. From iconic brands to the latest drops, elevate your sneaker game with exclusive styles available only at our store. Slide through to find your perfect pair and walk in confidence!
            </div>
            <div className='mt-8 flex justify-center'>
              <div id="button" className='bg-red-500 p-4 px-12 w-auto rounded-xl flex items-center justify-center reem-kufi-ink cursor-pointer' style={{ boxShadow: '0px 4px 8px rgba(255, 0, 0, 0.3)' }}>
                Shop Now
              </div>        
            </div>
          </div>

          <div className='flex-[0_0_50%] max-w-[700px] h-[600px] py-6 px-2'>

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



              {/* <img
                src={images[currentIndex]}
                alt="Slide"
                className='w-full h-full object-cover rounded-[45px]'
              /> */}


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

      </div>
    </>
  );
}

export default Home;
