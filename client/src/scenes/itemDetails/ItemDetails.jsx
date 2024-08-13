import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useParams } from "react-router-dom";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { addToCart, increaseCount } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import { GrNext } from "react-icons/gr";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdFavorite } from "react-icons/md";


const ItemDetails = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartItems = useSelector((state) => state.cart.cart);
  const [isClicked, setIsClicked] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  
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
    let selectedProductDetails = null;
  
    // Check if the product has options
    if (item.attributes.optionsProduct) {
      const options = item.attributes.optionsProduct.optionsProduct;
      const optionKeys = Object.keys(options);
  
      // Case 1: Product with 1 option
      if (optionKeys.length === 1) {
        const selectedOptionKey = optionKeys[0];
        selectedProductDetails = {
          [selectedOptionKey]: options[selectedOptionKey][selectedOption],
        };
      }
      // Case 2: Product with 2+ options
      else if (optionKeys.length > 1 && selectedOption !== 0) {
        const selectedOptionKey = optionKeys.find(
          (key) => options[key][selectedOption] !== undefined
        );
        if (selectedOptionKey) {
          selectedProductDetails = {
            [selectedOptionKey]: options[selectedOptionKey][selectedOption],
          };
        }
      }
    }
  
    // Create a new item object with selectedProductDetails
    const updatedItem = {
      ...item,
      attributes: {
        ...item.attributes,
        selectedProduct: selectedProductDetails,
      },
    };
  
    // Check if item already exists in cart
    const existingItem = cartItems.some((cartItem) => 
      cartItem.id === item.id && 
      (selectedProductDetails === null || cartItem.attributes.selectedProduct === updatedItem.attributes.selectedProduct)
    );
  
    if (existingItem) {
      dispatch(increaseCount({ id: item.id }));
    } else {
      // Item doesn't exist, add it to the cart
      dispatch(addToCart({ item: { ...updatedItem, count } }));
    }
  };
  
  
  


  async function getItemsByIds(ids) {
    const query = ids.id.map(id2 => `filters[id][$in]=${id2}`).join('&');
    const response = await fetch(
      `${constants.backendUrl}/api/items?${query}&populate=images`,
      {
        method: "GET",
      }
    );
    const itemsJson = await response.json();
    setItems(itemsJson.data);
    console.log(itemsJson.data)
  }
  
  

  async function getItem() {
    try {
      const response = await fetch(
        `${constants.backendUrl}/api/items/${itemId}?populate[images]=*&populate[optionsimages]=*`,
        {
          method: "GET",
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const itemJson = await response.json();
      itemJson.data.attributes.selectedProduct = null;
      setItem(itemJson.data);
      if (itemJson.data.attributes.relatedproducts){
        getItemsByIds(itemJson.data.attributes.relatedproducts);        
      }

    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }
  
  console.log(item)

  useEffect(() => {
    
    console.log('Fetching item and items for itemId:', itemId);
    getItem();
  }, [itemId]);

  useEffect(() => {
    if (isClicked) {
      setIsScaled(true);
      const timer = setTimeout(() => {
        setIsScaled(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClicked]);




  return (
    // add smaller screen functionality at px-10 level
    <div className="w-full h-auto px-10 md:px-10 xl:px-28 mb-20">
      <div className="h-[55px] w-full flex items-center">
      <Breadcrumbs
          separator={<GrNext className="text-[8px] ml-1 mr-1" />}
          aria-label="breadcrumb"
        >
          <div className="text-[14px]">Home</div>
          <div className="text-[14px]">Shop</div>
          <div className="text-[14px] capitalize">{item && item.attributes.category}</div>
          <div className="text-[14px]">Product</div>
          
        </Breadcrumbs>
      </div>

      <div className="h-full flex flex-col md:flex-row mt-2">

        <div className=" flex flex-col">

        <div className=" md:w-[550px] h-[730px] relative border rounded-lg">
        {item && <img
              alt={item.name}
              className="w-full h-full object-fit"
              src={`${constants.backendUrl}${item.attributes.images.data[currentImageIndex].attributes.url}`}
            
            />}
          {/* Container for child divs */}
          <div className="absolute top-8 left-8 right-0 bottom-0 flex flex-col items-start">

          {item && item.attributes.onSale && item.attributes.price > 0 ? (
            <div className="bg-[#38CB89] w-[84px] h-[34px] text-white rounded flex items-center justify-center mb-3 opacity-75">
              {((item.attributes.price - item.attributes.discount) / item.attributes.price * 100).toFixed(0)}%
            </div>
          ) : null}


            {item && item.attributes.product_types === "newArrivals" ? (
              <div className="bg-white w-[84px] h-[34px] border-2 rounded flex items-center justify-center font-bold opacity-75">
                NEW
              </div>
            ) : null}


          </div>

          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-wrap justify-between items-center">

            <div className="flex items-center justify-center bg-white border w-8 h-8 rounded-full shadow-md ml-4 opacity-75 cursor-pointer" onClick={handlePreviousImage}>
                <FaArrowLeft className="text-gray-500" />
            </div>
            <div className="flex items-center justify-center border bg-white w-8 h-8 rounded-full shadow-md mr-4 opacity-75 cursor-pointer" onClick={handleNextImage}>
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

        <div className=" pl-20">

          <div className=" h-auto pb-6 w-[500px] border-b border-[#E8ECEF]">
            <div className="text-[40px] font-bold mt-10 mb-2" style={{ fontFamily: 'Poppins, sans-serif'}}>{item && item.attributes.name}</div>
            <div style={{ fontFamily: 'Inter, sans-serif'}} className="text-[
#6C7275]">{item && item.attributes.longDescription[0].children[0].text}</div>
            <div className="flex flex-row mt-2" >
            {item && (
              item.attributes.onSale ? (
                <>
                  <div id="discount" className="mr-2 font-bold text-[28px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ${item.attributes.discount}
                  </div>
                  <div id="price" className="text-[20px] text-[#6C7275] mt-1 ml-3 line-through" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ${item.attributes.price}
                  </div>
                </>
              ) : (
                <div id="price" className="text-[20px] mt-1 ml-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ${item.attributes.price}
                </div>
              )
            )}
            </div>
          </div>

          <div id="measurements" className="mt-4 h-[60px] w-[150px] mb-6">
            <div className="font-semibold text-[16px] leading-[26px] text-[#6C7275] mb-1" style={{ fontFamily: 'Inter, sans-serif'}}>Measurements</div>

            <div className="font-normal text-[20px] leading-[32px] text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {item && item.attributes.measurements}
            </div>

          </div>

          <div id="options" className="">
          {item && item.attributes.optionsProduct && 
            Object.keys(item.attributes.optionsProduct.optionsProduct).map((key) => (
              <div key={key}>
                <div className="flex flex-row">
                  <div className="font-semibold text-[16px] leading-[26px] text-[#6C7275]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Choose {key}
                  </div>
                  <GrNext className="mt-1.5 ml-2 h-3 w-3 text-[#6C7275]"/>
                </div>

  
                <div className="font-normal text-[20px] leading-[32px] text-[#000000]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.attributes.optionsProduct.optionsProduct[key][selectedOption]}
                </div>
      

                <div id="images" className="flex flex-row gap-x-4 my-2 flex-wrap mb-6">
                  {item.attributes.optionsProduct.optionsProduct[key].map((option, index) => (
                    <div
                      key={index}
                      className={`h-16 w-16 my-2 cursor-pointer ${selectedOption === index ? 'border-2 border-black' : ''}`}
                      onClick={() => setSelectedOption(index)}
                    >
                      <img
                      alt={item.name}
                      className="w-full h-full object-fit"
                      src={`${constants.backendUrl}${item.attributes.optionsimages.data[index].attributes.url}`}
                    
                    />

                    </div>
                  ))}
                </div>
              </div>
          ))}
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
                      <div className="text-[#6C7275] w-[190px]" style={{ fontFamily: 'Inter, sans-serif'}}>{key}</div>
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

      <div id="relatedproducts" className="mt-20 h-auto">
        <div>
          <div className="font-bold text-[28px] mt-6 mb-10" style={{ fontFamily: 'Poppins, sans-serif'}}>You might also like</div>
        </div>

        <div id="slideshow">

        <div className="flex flex-row gap-10 flex-wrap justify-start ">
          {items && items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        </div>
        </div>

      </div>

    </div>
  );
};


export default ItemDetails;



