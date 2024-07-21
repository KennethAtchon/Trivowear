import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown  } from 'react-icons/fa';
import { addToCart, increaseCount } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import Accordion from './Accordion';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartItems = useSelector((state) => state.cart.cart);
  const scrollContainerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const scrollContainerMediumRef = useRef(null);
  const [isOverflowingMedium, setIsOverflowingMedium] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (optionName, optionValue) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: optionValue
    });
  };



  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -100, // adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 100, // adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerMediumRef.current) {
      scrollContainerMediumRef.current.scrollBy({
        left: -100, // adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerMediumRef.current) {
      scrollContainerMediumRef.current.scrollBy({
        left: 100, // adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };



  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  async function getItem() {
    const item = await fetch(
      `${constants.backendUrl}/api/items/${itemId}?populate=images`,
      {
        method: "GET",
      }
    );
    //console.log(item)
    const itemJson = await item.json();
    setItem(itemJson.data);
    
  }
  console.log(item)

  async function getItems() {
    const items = await fetch(
      `${constants.backendUrl}/api/items?populate=images`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }


  const handleAddToCart = () => {
    // Check if item already exists in cart
    const existingItem = cartItems.length !== 0 && cartItems.some((cartItem) => cartItem.id === item.id) ;

    if (existingItem) {
      dispatch(increaseCount({ id: item.id }));
    } else {
      // Item doesn't exist, add it to the cart
      dispatch(addToCart({ item: { ...item, count } }));
    }
  };

  const handlePreviousImage = () => {
    if (item && item.attributes.images.data.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? item.attributes.images.data.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (item && item.attributes.images.data.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === item.attributes.images.data.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };


  useEffect(() => {
    //console.log('Fetching item and items for itemId:', itemId);
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const checkOverflow = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setIsOverflowing(container.scrollHeight > container.clientHeight);
      }
    };

    const checkOverflowMedium = () => {
      const containerMedium = scrollContainerMediumRef.current;
      if (containerMedium) {
        setIsOverflowingMedium(containerMedium.scrollWidth > containerMedium.clientWidth);
      }
    };

    checkOverflow();
    checkOverflowMedium();
    window.addEventListener('resize', checkOverflow);
    window.addEventListener('resize', checkOverflowMedium);
    return () => {
      window.removeEventListener('resize', checkOverflow);
      window.removeEventListener('resize', checkOverflowMedium);
    };
  }, [item]);

  
  return (
    <div className="mx-auto my-20 mx-10 px-8">
      <div className="h-12"></div>
      <div className="flex flex-col md:flex-row gap-6 h-auto">

   
        <div id="sideimages" className="hidden md:flex w-28 p-3 flex-col max-h-[750px]">
        {isOverflowing && (
            <button onClick={scrollUp} className="mb-2 border bg-white">
              <FaArrowUp size={20} className="item-center w-full" />
            </button>
          )}
          <div ref={scrollContainerRef} className="h-full md:w-full overflow-y-hidden">
            {item?.attributes?.images?.data.map((image, index) => (
              <img
                key={index}
                alt={item?.name}
                className="object-fit h-20 w-full border-2 mt-2 cursor-pointer"
                src={`${constants.backendUrl}${image?.attributes?.formats?.thumbnail?.url}`}
                onClick={() => handleImageClick(index)}
              />
            ))}

          </div>
          {isOverflowing && (
            <button onClick={scrollDown} className="mt-2 border bg-white">
              <FaArrowDown size={20} className="item-center w-full " />
            </button>
          )}
        </div>
  

        <div className="flex-1 flex flex-row mb-10 mr-3">
          <div id="leftbar" className="md:h-full w-6 items-center justify-center cursor-pointer" onClick={handlePreviousImage}>
            <FaArrowLeft className="h-full w-full " />
          </div>
          <div id="imgdiv" className="flex-1">
            <img
              alt={item?.name}
              className="w-full h-full object-contain ml-3"
              src={`${constants.backendUrl}${item?.attributes?.images?.data[currentImageIndex]?.attributes?.formats?.thumbnail?.url}`}
              onClick={() => navigate(`/item/${item.id}`)}
            />
          </div>
          <div id="rightbar" className="md:h-full w-6 items-center justify-center cursor-pointer" onClick={handleNextImage}>
            <FaArrowRight className="h-full w-full ml-6" />
          </div>
        </div>

        <div id="sideimagesmedium" className="flex flex-row w-full md:hidden w-28 p-3 ">
          {isOverflowingMedium && (
            <button onClick={scrollLeft} className="w-8 border bg-white">
              <FaArrowLeft size={20} className="item-center w-full" />
            </button>
          )}
          <div ref={scrollContainerMediumRef} className="flex flex-row overflow-x-hidden">
            {item?.attributes?.images?.data.map((image, index) => (
              <img
                key={index}
                alt={item?.name}
                className="object-fit h-24 w-24 border-2 mx-2 cursor-pointer"
                src={`${constants.backendUrl}${image?.attributes?.formats?.thumbnail?.url}`}
                onClick={() => handleImageClick(index)}
              />
            ))}
            
          </div>
          {isOverflowingMedium && (
            <button onClick={scrollRight} className="ml-2 w-8 border bg-white">
              <FaArrowRight size={20} className="item-center w-full " />
            </button>
          )}
        </div>

          {/* ACTIONS */}
        <div className="flex-1 pl-12">

        <div className="mt-16 border-b border-slate-200">
          <h3 className="text-3xl font-semibold">{item?.attributes?.name}</h3>
          <p className="text-2xl mt-2 pb-1">${item?.attributes?.price}</p>
        </div>



          <div className=" border-b border-slate-200 my-5">
            < Accordion description={item?.attributes?.longDescription[0]?.children[0]?.text} />

          </div>

          {item?.attributes?.preciseDescription && (
          <div className="p-4 border-b border-slate-200">
            <div>
              {item && Object.entries(item?.attributes?.preciseDescription).slice(0, 4).map(([key, value]) => (
                <div key={key}>
                  <b className="inline-block mr-8">{key}</b>
                  <p className="inline-block">{Array.isArray(value) ? value.join(', ') : value}</p>
                </div>
              ))}
              {item && showMore && Object.entries(item?.attributes?.preciseDescription).slice(4).map(([key, value]) => (
                <div key={key}>
                  <b className="inline-block mr-8">{key}</b>
                  <p className="inline-block">{Array.isArray(value) ? value.join(', ') : value}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 text-blue-700 cursor-pointer" onClick={toggleShowMore}>
              {showMore ? 'Show less' : 'Show more'}
            </div>
          </div>
          )}

          {/* Dropdown for product options */}
          { item?.attributes?.optionsProduct && (
          <div className="border-b border-slate-200">
            {Object.entries(item?.attributes?.optionsProduct?.productOptions).map(([optionIdx, optionDict], index) => (
              <div key={index} className="m-4">
              <FormControl fullWidth>
                <InputLabel id={`select-label-${optionIdx}`}>{optionDict.name}</InputLabel>
                <Select
                  labelId={`select-label-${optionIdx}`}
                  id={`select-${optionIdx}`}
                  value={selectedOptions[optionDict.name] || ''}
                  label={optionDict.name}
                  onChange={(e) => handleOptionChange(optionDict.name, e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select {optionDict.name}</em>
                  </MenuItem>
                  {optionDict.values.map((value, idx) => (
                    <MenuItem key={idx} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </div>
            ))}
          </div> )}


          <div className="flex flex-col items-center min-h-[50px]">
            
            <div className="flex-1 my-2 flex justify-between items-center border border-gray-300 p-1 py-2 w-full">
              <button
                className="p-1"
                onClick={() => setCount(Math.max(count - 1, 0))}
              >
                <MdRemove />
              </button>
              <span className="px-3">{count}</span>
              <button className="p-1" onClick={() => setCount(count + 1)}>
                <MdAdd />
              </button>
            </div>

            <button
              className="flex-1 w-full font-bold bg-black text-white py-4 px-8 rounded-none "
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            <button
              className="mt-1 font-bold flex-1 w-full bg-white border-slate-300 border text-black py-4 px-8 rounded-none"
              onClick={handleAddToCart}
            >
              BUY NOW
            </button>
          </div>

        </div>
      </div>

      
      <div className="mt-24 w-full">
        <h3 className="text-3xl font-bold mb-4">Related Products</h3>
        <div
        className="grid justify-center gap-6 "
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
      >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} isRelated={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
