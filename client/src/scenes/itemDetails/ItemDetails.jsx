import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown  } from 'react-icons/fa';
import { addToCart, increaseCount } from "../../state";
import Item from "../../components/Item";
import constants from "../../constants.json";
import Accordion from './Accordion';

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

  useEffect(() => {
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

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [item]);

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

  return (
    <div className="mx-auto my-20 mx-10  px-8">
      <div className="flex flex-wrap gap-6 h-[750px]">

    <div className="w-28 h-[750px] p-3 flex flex-col">
    {isOverflowing && (
        <button onClick={scrollUp} className="mb-2 border bg-white">
          <FaArrowUp size={20} className="item-center w-full" />
        </button>
      )}
      <div ref={scrollContainerRef} className=" w-full flex-grow overflow-y-hidden">
        {item?.attributes?.images?.data.map((image, index) => (
          <img
            key={index}
            alt={item?.name}
            className="object-fit h-24 w-full border-2 mt-2 cursor-pointer"
            src={`${constants.backendUrl}${image?.attributes?.formats?.thumbnail?.url}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
        
      </div>
      {isOverflowing && (
        <button onClick={scrollDown} className="mt-2 border bg-white">
          <FaArrowDown size={20} className="item-center w-full" />
        </button>
      )}
    </div>
        <div className="flex-1 flex flex-row mb-10 mr-3">
          <div id="leftbar" className="h-full w-6 items-center justify-center cursor-pointer" onClick={handlePreviousImage}>
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
          <div id="rightbar" className="h-full w-6 items-center justify-center cursor-pointer" onClick={handleNextImage}>
            <FaArrowRight className="h-full w-full ml-6" />
          </div>
        </div>


        {/* ACTIONS */}
        <div className="flex-1 ">

        <div className="mt-16 border-b border-slate-200">
          <h3 className="text-3xl font-semibold">{item?.attributes?.name}</h3>
          <p className="text-2xl mt-2 pb-1">${item?.attributes?.price}</p>
        </div>



          <div className=" border-b border-slate-200 my-5">
           < Accordion description="Hello" />

          </div>
            <div className="p-4 border-b border-slate-200">
            <div className="">
              <div >
              <b className="inline-block mr-8">Material</b>
              <p className="inline-block">Metal</p>
              </div>
              <div >
              <b className="inline-block mr-8">Material</b>
              <p className="inline-block">Metal</p>
              </div>
              <div >
              <b className="inline-block mr-8">Material</b>
              <p className="inline-block">Metal</p>
              </div>
              {showMore && (
                <>
                <div >
                <b className="inline-block mr-8">Material</b>
                <p className="inline-block">Metal</p>
                </div>
                <div >
                <b className="inline-block mr-8">Material</b>
                <p className="inline-block">Metal</p>
                </div>
                <div >
                <b className="inline-block mr-8">Material</b>
                <p className="inline-block">Metal</p>
                </div>
                </>
              )}

            </div>



            <div className="mt-2 text-blue-700 cursor-pointer" onClick={toggleShowMore}>
              {showMore ? 'Show less' : 'Show more'}
            </div>
          </div>

          {/* <div className=" bg-blue-300 border-b border-slate-200">
          <button
              className="flex-1 m-4 font-bold bg-black text-white py-4 px-8 rounded-none "
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </button>
            <button
              className="flex-1 font-bold bg-black text-white py-4 px-8 rounded-none "
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </button>
            <button
              className="flex-1 m-4  font-bold bg-black text-white py-4 px-8 rounded-none "
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </button>
           Optional Buttons when there are different variations
          </div> */}


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

      
      <div className="mt-12 w-full">
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
