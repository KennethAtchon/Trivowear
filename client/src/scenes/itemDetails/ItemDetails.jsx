import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { addToCart, increaseCount } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import Accordion from './Accordion';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { GrNext } from "react-icons/gr";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdFavorite } from "react-icons/md";


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
  const [isClicked, setIsClicked] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
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


  async function getItems() {
    const response = await fetch(
      `${constants.backendUrl}/api/items?populate=images`,
      {
        method: "GET",
      }
    );
    const itemsJson = await response.json();
    setItems(itemsJson.data);
  }

  async function getItem() {
    const response = await fetch(
      `${constants.backendUrl}/api/items/${itemId}?populate=images`,
      {
        method: "GET",
      }
    );
    console.log(response)
    const itemJson = await response.json();
    setItem(itemJson.data);
    
  }
  console.log(item)

  useEffect(() => {
    if (isClicked) {
      setIsScaled(true);
      const timer = setTimeout(() => {
        setIsScaled(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  useEffect(() => {
    
    console.log('Fetching item and items for itemId:', itemId);
    getItem();
    getItems();
  }, [itemId]);


  return (
    <div className="w-full h-auto px-20 mb-20">
      <div className="h-[55px] w-full flex items-center">
      <Breadcrumbs
          separator={<GrNext className="text-[8px] ml-1 mr-1" />}
          aria-label="breadcrumb"
        >
          <div className="text-[14px]">Home</div>
          <div className="text-[14px]">Shop</div>
          <div className="text-[14px]">Category</div>
          <div className="text-[14px]">Product</div>
          
        </Breadcrumbs>
      </div>

      <div className="h-full flex flex-row mt-2">

        <div className=" flex flex-col">

        <div className=" w-[550px] h-[730px] relative border rounded-lg">
        {item && <img
              alt={item.name}
              className="w-full h-full object-fit"
              src={`${constants.backendUrl}${item.attributes.images.data[currentImageIndex].attributes.url}`}
            
            />}
          {/* Container for child divs */}
          <div className="absolute top-8 left-8 right-0 bottom-0 flex flex-col items-start">
            <div className="bg-[#38CB89] w-[84px] h-[34px] text-white rounded flex items-center justify-center mb-3 opacity-75">-50%</div>
            <div className="bg-white w-[84px] h-[34px] border-2 rounded flex items-center justify-center font-bold opacity-75">NEW</div>
          </div>

          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-wrap justify-between items-center">

            <div className="flex items-center justify-center bg-white border w-8 h-8 rounded-full shadow-md ml-4 opacity-75" onClick={handlePreviousImage}>
                <FaArrowLeft className="text-gray-500" />
            </div>
            <div className="flex items-center justify-center border bg-white w-8 h-8 rounded-full shadow-md mr-4 opacity-75" onClick={handleNextImage}>
                <FaArrowRight className="text-gray-500" />
            </div>

          </div>


        </div>

          <div className="w-[550px] flex flex-row justify-between mt-4">

          {item && item.attributes.images.data.map((image, index) => (
            <div key={index} className="h-[165px] w-[165px] border-2 rounded-lg cursor-pointer" onClick={() => handleImageClick(index)}>
            <img
              alt={"lol"}
              className="w-full h-full object-fit"
              src={`${constants.backendUrl}${image.attributes.url}`}
            
            />
            </div>
          ))}
          </div>

        </div>

        <div className="bg-red-400 flex-1 pl-20">

          <div className="bg-yellow-100 h-auto pb-6 w-[500px] border-b border-[#E8ECEF]">
            <div className="text-[40px] font-bold mt-10 mb-2" style={{ fontFamily: 'Poppins, sans-serif'}}>Tray Table</div>
            <div style={{ fontFamily: 'Inter, sans-serif'}} className="text-[
#6C7275]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A et laborum maxime, nisi consequatur laudantium possimus ipsam iure distinctio obcaecati ducimus repudiandae harum temporibus ea laboriosam labore unde. Ipsam, sequi.</div>
            <div className="flex flex-row mt-2" >
              <div id="discount" className="mr-2 font-bold text-[28px]" style={{ fontFamily: 'Poppins, sans-serif'}} >$199.00</div>
              <div id="price" className="text-[20px] text-[#6C7275] mt-1 ml-3 line-through" style={{ fontFamily: 'Poppins, sans-serif'}}>$400.00</div>
            </div>
          </div>

          <div id="measurements" className="mt-4 h-[60px] w-[150px] bg-pink-100 mb-6">
            <div className="font-semibold text-[16px] leading-[26px] text-[#6C7275] mb-1" style={{ fontFamily: 'Inter, sans-serif'}}>Measurements</div>

            <div className="font-normal text-[20px] leading-[32px] text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>
              17 1/2x20 5/8"
            </div>

          </div>

          <div id="options" className="bg-blue-100">

            <div className="flex flex-row">
              <div className="font-semibold text-[16px] leading-[26px] text-[#6C7275]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Choose Color
              </div>
              <GrNext className="mt-1.5 ml-2  h-3 w-3 text-[#6C7275]"/>

            </div>

            <div className="font-normal text-[20px] leading-[32px] text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Black
            </div>

            <div id="images " className="flex flex-row gap-x-4 my-2 flex-wrap">
                <div className="h-16 w-16 bg-red-100 my-2">

                </div>
                <div className="h-16 w-16 bg-red-200 my-2">

                </div>
                <div className="h-16 w-16 bg-red-300 my-2">

                </div>

            </div>
          </div>

          <div id="Add" className="flex flex-row">
            <div id="counter" className="h-[55px] w-[130px] mr-14 bg-[#F5F5F5] rounded-lg flex flex-row items-center">
              <MdRemove className="flex-1 cursor-pointer" onClick={() => setCount(Math.max(count - 1, 1))}/>   
              <div className="flex-1 text-center">{count}</div>           
              <MdAdd  className="flex-1 cursor-pointer" onClick={() => setCount(count + 1)}/>

            </div>

            <div id="wishlist" className="h-[55px] w-[360px] border border-[#141718] rounded-lg flex justify-center items-center">
            <button 
                  className="text-[#141718] text-[18px] flex flex-row" 
                  onClick={handleClick}
                >
                  <MdFavorite 
                    className={`mr-2 mt-1 transition-transform duration-300 ${isScaled ? 'transform scale-125' : ''} ${isClicked ? 'text-red-500' : ''}`} 
                  /> 
                  Wishlist
                </button>
            </div>

          </div>

          <div id="cart" >
            <div className="mt-6 bg-black h-[55px] w-[550px] flex justify-center items-center rounded-lg text-white text-[18px] font-bold cursor-pointer" style={{ fontFamily: 'Inter, sans-serif'}} onClick={handleAddToCart}>
              Add to Cart
            </div>
          </div>

          <div id="precisedesc" className=" mt-8 border-t border-[#E8ECEF] w-[550px] h-auto pt-5">
            {item?.attributes?.preciseDescription && (
              <div>
                <div>
                  {Object.entries(item?.attributes?.preciseDescription).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="h-5 flex flex-row text-xs items-center">
                      <div className="text-[#6C7275] w-[190px]" style={{ fontFamily: 'Inter, sans-serif'}}>{key}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif'}}>{Array.isArray(value) ? value.join(', ') : value}</div>
                    </div>
                  ))}
                  {showMore && Object.entries(item?.attributes?.preciseDescription).slice(4).map(([key, value]) => (
                    <div key={key} className="h-5 flex flex-row text-xs items-center">
                      <div className="text-[#6C7275] w-[100px]" style={{ fontFamily: 'Inter, sans-serif'}}>{key}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif'}}>{Array.isArray(value) ? value.join(', ') : value}</div>
                    </div>
                  ))}
                </div>
                {Object.entries(item?.attributes?.preciseDescription).length > 4 && (
                  <div className="mt-2 text-blue-700 text-xs cursor-pointer" onClick={toggleShowMore}>
                    {showMore ? 'Show less' : 'Show more'}
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>

      <div id="relatedproducts" className="mt-20 h-[400px] bg-blue-200">

      </div>

    </div>
  );
};


export default ItemDetails;


//       <div className="mt-24 w-full">
//         <h3 className="text-3xl font-bold mb-4">Related Products</h3>
//         <div
//         className="grid justify-center gap-6 "
//         style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
//       >
//           {items && items.slice(0, 4).map((item, i) => (
//             <Item key={`${item.name}-${i}`} item={item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

