// Confirmation.js
import React, {useEffect} from 'react';
import popper from '../../assets/party-popper.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../state/cart'; 


/*
** This does not need anymore information from the cart state**
** This will clear the cart state from localstorage, and what we currently have**
*/

/**
 * A functional component that displays a confirmation message after a successful order.
 * It clears the cart in Redux state and local storage.
 * 
 * @return {JSX.Element} A JSX element containing the confirmation message.
 */
const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart in Redux state
    dispatch(clearCart());

    // Clear the cart data from local storage
    localStorage.removeItem('cart');
  }, [dispatch]);

  
  return (
    <div className='h-[500px] px-0 md:px-40 py-16'>
      <div className='h-full max-w-[90%] md:w-full border border-white rounded-lg shadow-lg flex flex-col items-center text-white'>
        <div className='flex flex-col w-[550px] items-center pt-10'>
          <div className=' text-[28px] font-bold flex flex-row'>Thank you!
            <img src={popper} alt="popper" className='ml-2 mt-1 h-8 w-8' />
          </div>
          <div className=' text-[40px] font-bold text-center'>Your order has been received</div>
        </div>

        {/* <div 
          className='mt-5 flex flex-row justify-center gap-x-10 w-[550px]  items-center overflow-x-auto pb-2 pt-4' 
          style={{
            scrollbarWidth: "thin", // Firefox
            msOverflowStyle: "auto", // IE/Edge
          }}
        >
          <div id="imagecontainer">
            <div id="image" className='h-28 w-24 bg-red-100 relative'>
              <div 
                className='absolute top-0 right-0 w-8 h-8 bg-black rounded-full flex justify-center items-center'
                style={{ transform: 'translate(25%,-25%)' }}>
                <p className='text-white text-sm font-bold'>1</p>
              </div>
            </div>  
          </div>
          <div id="imagecontainer">
            <div id="image" className='h-28 w-24 bg-red-100 relative'>
              <div 
                className='absolute top-0 right-0 w-8 h-8 bg-black rounded-full flex justify-center items-center'
                style={{ transform: 'translate(25%,-25%)' }}>
                <p className='text-white text-sm font-bold'>1</p>
              </div>
            </div>  
          </div>
          <div id="imagecontainer">
            <div id="image" className='h-28 w-24 bg-red-100 relative'>
              <div 
                className='absolute top-0 right-0 w-8 h-8 bg-black rounded-full flex justify-center items-center'
                style={{ transform: 'translate(25%,-25%)' }}>
                <p className='text-white text-sm font-bold'>1</p>
              </div>
            </div>  
          </div>
          


        </div> */}

        {/* <div className='mt-5 flex flex-col justify-evenly w-[550px] h-[150px]  items-center '>
          <div className='flex flex-row justify-between w-[250px]'>
            <div className='text-[#6C7275]'>Order Code: </div>
            <div>#0123_45678</div>
          </div>
          <div className='flex flex-row justify-between w-[250px]'>
            <div className='text-[#6C7275]'>Date: </div>
            <div>October 19, 2023</div>
          </div>
          <div className='flex flex-row justify-between w-[250px]'>
            <div className='text-[#6C7275]'>Total: </div>
            <div>$1,345.00</div>
          </div>
          
        </div> */}

        <div className='mt-12 flex flex-col w-[200px] h-[55px] bg-white rounded-2xl items-center justify-center cursor-pointer' onClick={() => navigate('/')}>
          <div className='text-black'>Shop for More</div>

        </div>

      </div>
    </div>
  );
};

export default Confirmation;
