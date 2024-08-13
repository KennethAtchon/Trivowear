import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, increaseCount } from "../state/cart";
import { MdShare, MdFavorite } from "react-icons/md";
import constants from "../constants.json";
import { addToLikes, removeFromLikes } from "../state/likes";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const likedItems = useSelector((state) => state.likes.likedItems);
  const [isClicked, setIsClicked] = useState(false);
  const [isScaled, setIsScaled] = useState(false);

  const { price, name, images, shortDescription, onSale, discount, product_types } = item.attributes;

  const isLiked = likedItems.some((likedItem) => likedItem.id === item.id);

  useEffect(() => {
    setIsClicked(isLiked);
  }, [isLiked]);
  
  useEffect(() => {
    if (isClicked) {
      setIsScaled(true);
      const timer = setTimeout(() => {
        setIsScaled(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleAddToCart = () => {
    const existingItem =
      cartItems.length !== 0 &&
      cartItems.some((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      dispatch(increaseCount({ id: item.id }));
    } else {
      const count = 1
      dispatch(addToCart({ item: { ...item, count } }));
    }
  };

  const handleOverlayClick = () => {
    navigate(`/item/${item.id}`);
  };

  const parseItem = (item) => {
    return {
      id: item.id,
      attributes:{
      name: item.attributes.name,
      images: item.attributes.images.data.map(image => ({
        id: image.id,
        url: image.attributes.url
      }))        
      }

    };
  };
  
  // Usage example within your `handleLikeClick` function
  const handleLikeClick = () => {
    const parsedItem = parseItem(item);
    console.log("likes", JSON.stringify(parsedItem));
    
    if (isLiked) {
      dispatch(removeFromLikes({ id: parsedItem.id }));
    } else {
      dispatch(addToLikes(parsedItem));
    }
    setIsClicked(!isClicked); // Toggle click state
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
              src={`${constants.backendUrl}${item.attributes.images.data[0].attributes.url}`}
              onClick={() => navigate(`/item/${item.id}`)}
            />
          )}

          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 z-10">

              <div className="flex-1 w-full h-full" onClick={handleOverlayClick}></div>

              <button
                className="py-2 px-8 text-[#B88E2F] text-lg bg-white text-[16px]"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <div className="flex space-x-4">
                <button className="text-white text-lg flex flex-row ">
                  <MdShare className="mr-2 mt-1.5"/> Share
                </button>
                <button 
                  className="text-white text-lg flex flex-row" 
                  onClick={handleClick}
                >
                  <MdFavorite 
                    className={`mr-2 mt-1.5 transition-transform duration-300 ${isScaled ? 'transform scale-125' : ''} ${isClicked ? 'text-red-500' : ''}`} 
                    onClick={handleLikeClick}
                  /> 
                  Like
                </button>
              </div>

              <div className="flex-1 w-full h-full" onClick={handleOverlayClick}></div>
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

          {!isHovered && !onSale && (product_types === "newArrivals") && (
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
          {/* attention */}
          <div className="w-full h-[30px] text-[20px] mt-4 mb-4 overflow-auto">{name}</div>
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
