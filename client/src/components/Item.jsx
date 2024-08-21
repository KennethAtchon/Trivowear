import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, increaseCount } from "../state/cart";
import { MdShare, MdFavorite } from "react-icons/md";
import constants from "../constants.json";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { price, name, images, onSale, discount, product_types } = item.attributes;
  
  return (
    <div className="w-[300px] h-[480px] p-4 pb-6 flex flex-col justify-between relative">

      { onSale && (
        <div className="absolute inset-0 flex mt-6 mr-10 justify-end">
          <div className="w-12 h-12 bg-red-600 rounded-full opacity-90 flex items-center justify-center shadow-[0px_0px_10px_rgba(255,0,0,0.8)]">
            <div className="text-white text-xs font-bold">
              {price > 0 ? ((price - discount) / price * 100).toFixed(0) : 0}%
            </div>
          </div>
        </div>
      )}


    {/* width: 268px height: 400px */}
    <div className="w-full h-[300px] rounded-2xl shadow-[0px_0px_10px_rgba(255,255,255,0.8)]">
    <img
          key={0}
          alt={name}
          className="w-full h-full object-fit rounded-2xl cursor-pointer"
          src={`${constants.backendUrl}${images.data[0].attributes.url}`}
          onClick={() => navigate(`/item/${item.id}`)}
        />
    </div>
    
    <div className="w-full h-[110px] flex flex-col justify-evenly text-white cursor-pointer" onClick={() => navigate(`/item/${item.id}`)}>
      <div className="reem-kufi-ink text-xl">{name}</div>
      <div className="reem-kufi-ink">Reviews</div>
      <div className=" flex flex-row items-center text-2xl">
      {onSale ? (
        <>
          <div className={`mr-2 reem-kufi-ink`}>${discount}</div>
          <div className={`relative inline-block text-red-500 line-through reem-kufi-ink`}>${price}</div>
        </>
      ) : (
        <div className={`reem-kufi-ink`}>${price}</div>
      )}        
      </div>
    </div>

  </div>
  );
};

export default Item;


  // {!onSale && (product_types === "newArrivals") && (
  //             <div className="absolute inset-0 flex mt-6 mr-10 justify-end">
  //               <div className="w-12 h-12 bg-green-500 rounded-full opacity-90 flex items-center justify-center">
  //                 <div className="text-white text-xs font-bold">
  //                   New
  //                 </div>
  //               </div>
  //             </div>
  // )}
