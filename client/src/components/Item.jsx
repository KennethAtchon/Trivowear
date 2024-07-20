import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, increaseCount } from "../state";
import { MdAdd, MdRemove } from "react-icons/md";
import constants from "../constants.json";

const Item = ({ item, width, isRelated = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  const { product_types, price, name, images } = item.attributes;

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

  return (
    <div className={`${width} `}>
      <div
        className="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className="w-full h-72 overflow-hidden cursor-pointer">
          {images.data.length > 0 && (
            <img
              key={0}
              alt={name}
              className="w-full h-full object-cover"
              src={`${constants.backendUrl}${images.data[0].attributes.formats.thumbnail.url}`}
              onClick={() => navigate(`/item/${item.id}`)}
            />
          )}
        </div>
        {!isRelated && ( // Render if isRelated is false
          <div
            className={`absolute bottom-10 left-0 w-full px-5 ${
              isHovered ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-center bg-gray-200 rounded-md">
                <button
                  className="p-2"
                  onClick={() => setCount(Math.max(count - 1, 1))}
                >
                  <MdRemove />
                </button>
                <span className="px-3 text-blue-500">{count}</span>
                <button className="p-2" onClick={() => setCount(count + 1)}>
                  <MdAdd />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-1">
        <div className="flex justify-between">
          <p className="">{name}</p>
          <p className="font-bold">${price}</p>
        </div>

        <button
          className={`py-2 text-[22px] w-full border-black border-2 ${
            isRelated ? "hidden" : "" // Hide button if isRelated is true
          }`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
