// Cart.js
import React , {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import Radio from '@mui/material/Radio';
import { RiCouponLine } from "react-icons/ri";
import { decreaseCount, increaseCount, removeFromCart, updateShippingInCart  } from "../../state/cart";
import constants from "../../constants.json";
import {useNavigate } from "react-router-dom";
/*
Coupons: Work later
(Later: lock in the coupons)

*/

const Cart = ({ handleNextStep }) => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedShipping, setSelectedShipping] = useState('');
  const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);


  // Calculate subtotal and set the default shipping option
  useEffect(() => {
    if (cart && cart.length > 0) {
      // Calculate the subtotal
      const calculatedSubtotal = cart.reduce((acc, item) => {
        const price = item.attributes.onSale ? item.attributes.discount : item.attributes.price;
        return acc + item.count * price;
      }, 0);
      setSubtotal(calculatedSubtotal);

      // Set the first available shipping option as default
      const firstShippingOption = Object.keys(cart[0].attributes.shippingDetails.shippingDetails)[0];
      setSelectedShipping(firstShippingOption);
    }
  }, [cart]);

  // Update the total when the selected shipping option changes
  useEffect(() => {
    if (cart && selectedShipping) {
      const selectedShippingCost = parseFloat(cart[0].attributes.shippingDetails.shippingDetails[selectedShipping].shippingCost.replace('$', '')) || 0;
      setSelectedShippingPrice(selectedShippingCost);
      setTotal(subtotal + selectedShippingCost);
    }
  }, [selectedShipping, subtotal, cart]);

  const handleSubmit = () => {
    if(cart.length > 0){
    dispatch(updateShippingInCart({ selectedShipping, selectedShippingPrice }));
    handleNextStep();      
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      const firstShippingOption = Object.keys(cart[0].attributes.shippingDetails.shippingDetails)[0];
      setSelectedShipping(firstShippingOption);
    }
  }, [cart]);

  const handleChange = (event) => {
    setSelectedShipping(event.target.value);
  };  
  const shippingOptions = cart.length > 0 ? Object.entries(cart[0].attributes.shippingDetails.shippingDetails) : [];

  const handleRemoveFromCart = (item) => {
    console.log("item id: ", item.id)
    console.log("selected: ", JSON.stringify(item.attributes.selectedProduct))

    if(cart.length > 1){
      dispatch(removeFromCart({ 
      id: item.id, 
      selected: JSON.stringify(item.attributes.selectedProduct) 
      }));
    }else {
      dispatch(removeFromCart({ 
        id: item.id, 
        selected: JSON.stringify(item.attributes.selectedProduct) 
      }));
      navigate('/');
    }


  };
  

  return (
    <div className=" w-full h-full flex flex-col">

      {/* 485px */}
      <div id="cartitems" className="flex flex-col md:flex-row justify-between my-12 h-auto gap-x-16">
        {/* w-[645px] */}
        <div id="products" className=" md:w-auto ">
           <div className='flex flex-row justify-between pb-5 border-b border-[#6C7275]'>
            <div>Product</div>   

            <div className='flex flex-row justify-between w-[325px]'>
              <div>Quantity</div>
              <div>Price</div>
              <div>Subtotal</div>              
            </div>
           </div>

           <div id="itemcontainer" className='overflow-y-auto h-[450px]'
            style={{
              scrollbarWidth: "thin", // Firefox
              msOverflowStyle: "auto", // IE/Edge
            }}>
            {cart && cart.map((item) => {
              const price = item.attributes.onSale ? item.attributes.discount : item.attributes.price;
              const itemSubtotal = item.count * price;
              return (
                <div key={item.id} id="item" className="flex flex-row justify-between my-4 border-b pb-3">
                  <div className="h-24 w-80 flex flex-row items-center">
                    <div id="image" className="h-24 w-20 bg-blue-500 mr-2">
                      {item && (
                        <img
                          alt={item.name}
                          className="w-full h-full object-fit"
                          src={`${constants.backendUrl}${item.attributes.images.data[0].attributes.url}`}
                        />
                      )}
                    </div>
                    <div id="productdesc" className="h-20 w-56 flex flex-col justify-evenly">
                      <div className="text-[14px] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.attributes.name}
                      </div>
                      <div id="options" className="text-[12px] text-[#6C7275]">
                        {item.attributes.selectedProduct && (
                          <>
                            {Object.entries(item.attributes.selectedProduct).map(([key, value], index) => (
                              <div key={index}>
                                {key}: {value}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="flex flex-row text-[#6C7275]">
                        <FiX className="mt-[3px] text-[20px] cursor-pointer" 
                        onClick={() => handleRemoveFromCart(item)} />
                        Remove
                      </div>
                    </div>
                  </div>
                  <div id="quantity-price-subtotal" className="flex flex-row justify-between w-[325px] items-center">
                    <div className="flex items-center border border-[#6C7275] p-1 rounded-lg">
                      <FiMinus className="cursor-pointer" onClick={() => dispatch(decreaseCount({ id: item.id, 
                    selected: JSON.stringify(item.attributes.selectedProduct)
                  }))} />
                      <span className="mx-3">{item.count}</span>
                      <FiPlus className="cursor-pointer" onClick={() => dispatch(increaseCount({ id: item.id, 
                    selected: JSON.stringify(item.attributes.selectedProduct)
                  }))} />
                    </div>
                    <div className="pr-4">
                      ${(price).toFixed(2)}
                    </div>
                    <div>${itemSubtotal.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>

           
        </div>

        <div id="cartsummary" className="w-[415px] rounded-lg p-4 border-black border">
          <div className='text-[20px] mb-2' style={{ fontFamily: 'Poppins, sans-serif'}}>Cart Summary</div>

          <div id="shipping" className="h-[210px] overflow-y-auto" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}>
            {shippingOptions.map(([key, details], index) => (
              <div key={index} id="shippingoption" className="flex flex-row justify-between rounded-md border border-black p-2 mb-3">
                <div className="flex flex-row items-center">
                  <Radio
                    checked={selectedShipping === key}
                    onChange={handleChange}
                    value={key}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': key }}
                    color="default"
                  />
                  <div>{key.split("Shipping")[0].replace(/^./, key[0].toUpperCase()) + " Shipping"} ({details.timeFrameDays-2}-{details.timeFrameDays+2})</div>
                </div>
                <div className="flex flex-row items-center mr-2">
                  {details.shippingCost === 'free' ? '$0.00' : details.shippingCost}
                </div>
              </div>
            ))}
          </div>



          <div id='subtotal' className='mt-5 flex flex-row justify-between border-b border-[
#EAEAEA] pb-3'>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>Subtotal</div>
            <div style={{ fontFamily: 'Inter, sans-serif'}}>${subtotal.toFixed(2)}</div>
          </div>

          <div id='total' className='mt-3 flex flex-row justify-between '>
          <div className='text-[20px] font-bold' style={{ fontFamily: 'Inter, sans-serif'}}>Total</div>
          <div className='font-bold mt-1' style={{ fontFamily: 'Inter, sans-serif'}}>${total.toFixed(2)}</div>
          </div>

          <div id='checkout' className='mt-8 flex flex-row justify-center items-center rounded-md bg-black p-2 py-3 cursor-pointer' onClick={handleSubmit}>
                <div className='text-white' style={{ fontFamily: 'Inter, sans-serif'}}>
                  Checkout</div>
          </div>




        </div>

      </div>

      <div id="tools" className='flex-1 w-full  flex flex-row justify-between mt-2'>
        <div id="coupon" className='w-[425px] '>
          <div className="font-bold text-[20px]">Have a coupon?</div>
          <div className="font-semibold text-[16px] text-[#6C7275]">Add your code for an instant cart discount</div>
          <div className="mt-4 flex flex-row justify-between items-center rounded-md border p-2">
        <div className="flex flex-row items-center">
          <RiCouponLine className="ml-1 mr-2 text-xl text-[#6C7275]" />
          <input 
            type="text" 
            placeholder="Enter coupon code" 
            className="outline-none text-[#6C7275] bg-transparent" 
          />
        </div>
        <button className="mr-2 font-semibold">Apply</button>
      </div>


        </div>


      </div>

    </div>
  );
};

export default Cart;
