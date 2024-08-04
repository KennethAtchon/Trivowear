import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, increaseCount } from "../state/cart";
import { MdShare, MdFavorite } from "react-icons/md";
import constants from "../constants.json";


const Item = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  const { price, name, images, shortDescription, onSale, discount, product_types } = item.attributes;


  const handleAddToCart = () => {
    const existingItem =
      cartItems.length !== 0 &&
      cartItems.some((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      dispatch(increaseCount({ id: item.id }));
    } else {
      dispatch(addToCart({ item: { ...item, count } }));
    }
  };

  const handleOverlayClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
<div className={`w-[290px] h-[450px]`}>
      <div
        className="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Image 285x300 */}
        <div className="w-full h-[300px] cursor-pointer border-t border-x">
           {images.data.length > 0 && (
            <img
              key={0}
              alt={name}
              className="w-full h-full object-fit"
              src={`${constants.backendUrl}${images.data[0].attributes.url}`}
              onClick={() => navigate(`/item/${item.id}`)}
            />
          )}

          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4" onClick={handleOverlayClick}>

              <button
                className="py-2 px-8 text-[#B88E2F] text-lg bg-white text-[16px]"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <div className="flex space-x-4">
                <button className="text-white text-lg flex flex-row">
                  <MdShare className="mr-2 mt-1.5"/> Share
                </button>
                <button className="text-white text-lg flex flex-row">
                  <MdFavorite className="mr-2 mt-1.5"/> Like
                </button>
              </div>
            </div>
          )}


          {!isHovered && onSale && (
            <div className="absolute inset-0 flex mt-6 mr-10 justify-end">
              <div className="w-12 h-12 bg-red-500 rounded-full opacity-90 flex items-center justify-center">
                <div className="text-white text-xs font-bold">
                  {price > 0 ? ((price - discount) / price * 100).toFixed(0) : 0}%
                </div>
              </div>
            </div>
          )}

          {!isHovered && !onSale && (product_types == "newArrivals") && (
                      <div className="absolute inset-0 flex mt-6 mr-10 justify-end">
                        <div className="w-12 h-12 bg-green-500 rounded-full opacity-90 flex items-center justify-center">
                          <div className="text-white text-xs font-bold">
                            New
                          </div>
                        </div>
                      </div>
          )}

        </div>

        <div className="w-full h-[145px] flex flex-col bg-[#F4F5F7] pl-2">
          <div className="w-full h-[30px] text-[20px] mt-4 mb-4">{name}</div>
          <div className="w-full h-[25px] text-[14px] mb-3 text-[#898989]">
            {shortDescription[0].children[0].text}
          </div>
          <div className="w-full h-[30px] flex flex-row items-center">
          {onSale ? (
              <>
                <div className={`mr-6 ${isHovered ? 'text-gray-400' : 'text-black'}`}>${discount}</div>
                <div className={`relative inline-block ${isHovered ? 'text-red-200' : 'text-red-500'} line-through`}>${price}</div>
              </>
            ) : (
              <div className={`mr-6 ${isHovered ? 'text-gray-400' : 'text-black'}`}>${price}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
