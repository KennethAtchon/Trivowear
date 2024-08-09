// Cart.js
import React from 'react';
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import Radio from '@mui/material/Radio';
import { RiCouponLine } from "react-icons/ri";

const Cart = ({ handleNextStep }) => {

  const handleSubmit = () => {

    handleNextStep();
  };

  return (
    <div className=" w-full h-full flex flex-col">

      <div id="cartitems" className="flex flex-row justify-between my-12 h-[485px]">
        <div id="products" className=" w-[645px] ">
           <div className='flex flex-row justify-between pb-5 border-b border-[#6C7275]'>
            <div>Product</div>   

            <div className='flex flex-row justify-between w-[325px]'>
              <div>Quantity</div>
              <div>Price</div>
              <div>Subtotal</div>              
            </div>
           </div>

           <div id="item" className='flex flex-row justify-between  my-4'>
            <div className='h-24 w-80 flex flex-row items-center'>
              <div id="image" className='h-20 w-24 bg-blue-500 mr-2'>
                
              </div>
              <div id="productdesc" className='h-20 w-56 flex flex-col justify-evenly'>
                <div className='text-[14px] font-semibold' style={{ fontFamily: 'Inter, sans-serif'}}>Tray Table</div>
                <div className='text-[12px] text-[#6C7275]' style={{ fontFamily: 'Inter, sans-serif'}}>Color: black</div>
                <div className='flex flex-row text-[#6C7275]'> <FiX className='mt-[3px] text-[20px]'/> Remove</div>
              </div>              
            </div>

            <div id="quantity-price-subtotal" className='flex flex-row justify-between w-[325px] items-center'>
              <div className="flex items-center border border-[#6C7275] p-1 rounded-lg">
              <FiMinus className="cursor-pointer"  />
              <span className="mx-3">1</span>
              <FiPlus className="cursor-pointer" />                    
              </div>
              <div className='pr-4'>$19.00</div>
              <div>$38.00</div>              
            </div>



           </div>
        </div>

        <div id="cartsummary" className="w-[415px] rounded-lg p-4 border-black border">
          <div className='text-[20px] mb-2' style={{ fontFamily: 'Poppins, sans-serif'}}>Cart Summary</div>

          <div id="shipping" className='h-[210px]  overflow-y-auto'>
            <div id="shippingoption" className='flex flex-row justify-between rounded-md border border-black p-2 mb-3'>
              <div className='flex flex-row items-center'>
                <Radio
                  // checked={selectedValue === 'a'}
                  // onChange={handleChange}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'A' }}
                  color="default"
                />
                <div>Free Shipping</div>
              </div>
              <div className='flex flex-row items-center mr-2'>$0.00</div>
            </div>
          </div>


          <div id='subtotal' className='mt-5 flex flex-row justify-between border-b border-[
#EAEAEA] pb-3'>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>Subtotal</div>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>$1234.00</div>
          </div>

          <div id='total' className='mt-3 flex flex-row justify-between '>
          <div className='text-[20px] font-bold' style={{ fontFamily: 'Inter, sans-serif'}}>Total</div>
          <div className='font-bold mt-1' style={{ fontFamily: 'Inter, sans-serif'}}>$1235.00</div>
          </div>

          <div id='checkout' className='mt-8 flex flex-row justify-center items-center rounded-md bg-black p-2 py-3'>
                <div className='text-white' style={{ fontFamily: 'Inter, sans-serif'}}>Checkout</div>
          </div>




        </div>

      </div>

      <div id="tools" className='flex-1 w-full  flex flex-row justify-between mt-2'>
        <div id="coupon" className='w-[425px] '>
          <div className="font-bold text-[20px]">Have a coupon?</div>
          <div className="font-semibold text-[16px] text-[#6C7275]">Add your code for an instant cart discount</div>
          <div className="mt-4 flex flex-row justify-between items-center rounded-md border p-2">
            <div className="flex flex-row">
              <RiCouponLine className="ml-1 mr-2 text-xl text-[#6C7275]"/>
              <div className="text-[#6C7275]">Coupon Code</div>
            </div>
            <div className="mr-2">Apply</div>
          </div>

        </div>
        <div id="nextstep" className='w-[225px] flex justify-end'>
            <button
                onClick={handleSubmit}
                className='h-16 mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg'
            >
                Checkout
            </button>

        </div>

      </div>

    </div>
  );
};

export default Cart;
