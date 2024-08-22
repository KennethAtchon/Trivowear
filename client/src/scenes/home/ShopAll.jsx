import React, { useState } from "react";
import ShoppingList from './ShoppingList';
import { GrNext } from "react-icons/gr";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { IoOptionsOutline } from "react-icons/io5";
import { Checkbox } from "@mui/material";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useParams, useNavigate } from 'react-router-dom';

const categories = [
  {key: 'appliances', value: 'Appliances'},
  {key: 'fitness', value: 'Fitness'},
  {key: 'kitchen', value: 'Kitchen'},
  {key: 'care', value: 'Home Care'},
  
];


const SortDropdown = ({ setSorter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sort By');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    let sortString = '';
    switch(option) {
      case 'Price: Low to High':
        sortString = '&sort=price:asc';
        break;
      case 'Price: High to Low':
        sortString = '&sort=price:desc';
        break;
      case 'Newest Arrivals':
        sortString = '&sort=publishedAt:desc';
        break;
      default:
        sortString = '';
    }

    setSelectedOption(option);
    setSorter(sortString);
    setIsOpen(false);
  };


  return (
    <div >
      <div className="p-3 px-5 flex flex-row items-center cursor-pointer" onClick={toggleDropdown}>
        <div>{selectedOption}</div>
        <RiArrowDropDownLine size={28} />
      </div>
      {isOpen && (
        <div className=" absolute z-50 mt-2 bg-white border rounded-lg shadow-[0px_0px_10px_rgba(255,255,255,0.8)] ">
          <div className="p-2 hover:bg-gray-200 cursor-pointer pr-4 rounded-t-lg" onClick={() => handleOptionClick('Price: Low to High')}>Price: Low to High</div>
          <div className="p-2 hover:bg-gray-200 cursor-pointer pr-4" onClick={() => handleOptionClick('Price: High to Low')}>Price: High to Low</div>
          <div className="p-2 hover:bg-gray-200 cursor-pointer pr-4 rounded-b-lg" onClick={() => handleOptionClick('Newest Arrivals')}>Newsest Arrivals</div>
        </div>
      )}
    </div>
  );
};

const Shop = ({ searchQuery = '' }) => {
  const { category } = useParams();
  const [filters, setFilters] = useState("");
  const [sorters, setSorter] = useState("");
  //const [sizefilter, setsizefilter] = useState("");
  const [prices, setPrices] = useState({
    allPrice: false,
    priceRanges: {
      '0-99': false,
      '100-199': false,
      '200-299': false,
      '300-399': false,
      '400-plus': false
    }
  });
  const navigate = useNavigate();
  //const [selectedSize, setSelectedSize] = useState("");
  // const sizes = [
  //   'XX-Small',
  //   'X-Small',
  //   'Small',
  //   'Medium',
  //   'Large',
  //   'X-Large',
  //   'XX-Large',
  //   '3X-Large',
  //   '4X-Large',
  //   'All Sizes',
  // ];

  console.log(sorters)

  // const handleSizeFilterChange = ( size) => {

  //   if (size === "All Sizes") {
  //     setSelectedSize("");
  //   } else {
  //     setSelectedSize(size);
  //   }
  //   console.log(size)
  //   setsizefilter(`&filters[size][$eq]=${size}`);

  // };


  const handlePriceFilterChange = (event) => {
    const { id, checked } = event.target;
  
    if (id === "all-price") {
      setPrices({
        allPrice: checked,
        priceRanges: {
          '0-99': false,
          '100-199': false,
          '200-299': false,
          '300-399': false,
          '400-plus': false
        }
      });
      setFilters(""); // Clear filters or set default
    } else {
      setPrices(prevPrices => {
        const updatedPrices = {
          allPrice: false,
          priceRanges: {
            ...prevPrices.priceRanges,
            [id.replace('price-', '')]: checked
          }
        };
  
        // Calculate min and max values based on selected price ranges
        const ranges = {
          '0-99': [0, 100],
          '100-199': [100, 200],
          '200-299': [200, 300],
          '300-399': [300, 400],
          '400-plus': [400, Infinity]
        };
  
        const selectedRanges = Object.entries(updatedPrices.priceRanges)
          .filter(([range, isChecked]) => isChecked)
          .map(([range]) => ranges[range]);
  
        if (selectedRanges.length > 0) {
          const min = Math.min(...selectedRanges.map(range => range[0]));
          const max = Math.max(...selectedRanges.map(range => range[1]));
  
          // `&filters[price][$between]=${min}&filters[price][$between]=${max}`
          const queryString = `&filters[price][$between]=${min}&filters[price][$between]=${max}`;
          setFilters(queryString);
        } else {
          setFilters(""); // Clear filters if no ranges are selected
        }

        //  filters[price][$between]=min&filters[price]
  
        return updatedPrices;
      });
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category}`);
  };
  


  return (
    <div className="mx-0 md:mx-28 mt-40 pt-6">
      <div id="home-page">  
        <p className="text-4xl font-bold">
          <Breadcrumbs
            separator={<GrNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "white" }}
          >
            <div className="text-[16px] cursor-pointer hover:text-red-500" onClick={() => navigate(`/`)}>Home</div>
            <div className="text-[16px] cursor-pointer hover:text-red-500" onClick={() => navigate(`/shop`)}>Shop</div>
            {category && 
              <div>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</div>
            }
          </Breadcrumbs>
        </p>

        <h1 className="text-4xl font-bold text-white mt-8 pb-2 w-full flex justify-center">
          {category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : "Shop All"}
        </h1>


      
      </div>

      <div className='flex flex-row pt-16 gap-4'>

        <div className=' w-[200px] text-[20px] pl-2 bg-white rounded-xl text-black'>
          <div className='flex flex-row mt-2 border-b border-black  mr-3 pb-4'>
          <IoOptionsOutline className='mt-1 mr-2' />
          <div>Filter</div>
          </div>

          <div className='mt-4 '>
            <div id="title" className="text-[14px]  reem-kufi-ink" style={{ fontWeight: 'bold' }}>CATEGORIES</div>
            <div id="container" className=" text-[14px] mt-2  flex flex-col gap-1 border-b border-black mr-3 pb-4">
              {categories.map(category => (
                <div key={category.key} onClick={() => handleCategoryClick(category.key)} className="cursor-pointer reem-kufi-ink hover:text-red-500">{category.value}</div>
              ))}
            </div>
          </div>

          <div className='mt-4'>
            <div id="title" className="text-[14px] reem-kufi-ink" style={{ fontWeight: 'bold' }}>PRICE</div>
            
            <div id="container" className=" text-[14px] mt-2 flex flex-col gap-1 mr-3  pb-4">

              <div className="flex justify-between items-center">
                <label htmlFor="all-price">All Price</label>
                <Checkbox id="all-price" checked={prices.allPrice} color="default" onChange={handlePriceFilterChange} sx={{ width: 24, height: 24 }} />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="price-0-99">$0.00 - 99.99</label>
                <Checkbox id="price-0-99" checked={prices.priceRanges['0-99']} color="default" onChange={handlePriceFilterChange} sx={{ width: 24, height: 24 }}/>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="price-100-199">$100.00 - 199.99</label>
                <Checkbox id="price-100-199" checked={prices.priceRanges['100-199']} color="default" onChange={handlePriceFilterChange} sx={{ width: 24, height: 24 }}/>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="price-200-299">$200.00 - 299.99</label>
                <Checkbox id="price-200-299" checked={prices.priceRanges['200-299']} color="default" onChange={handlePriceFilterChange} sx={{ width: 24, height: 24 }}/>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="price-300-399">$300.00 - 399.99</label>
                <Checkbox id="price-300-399" checked={prices.priceRanges['300-399']} color="default" onChange={handlePriceFilterChange} sx={{ width: 24, height: 24 }}/>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="price-400-plus">$400.00+</label>
                <Checkbox id="price-400-plus" checked={prices.priceRanges['400-plus']} color="default" onChange={handlePriceFilterChange} sx={{ width: 24, height: 24 }}/>
              </div>
              
            </div>
          </div>

          {/* <div className='mt-4 mb-10'>
            <div id="title" className="text-[14px] font-bold  reem-kufi-ink" style={{ fontWeight: 'bold' }}>SIZE</div>
            <div id="container" className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`text-sm p-1 px-2 rounded-full reem-kufi-ink ${
                    selectedSize === size ? 'bg-black text-white' : 'bg-gray-200 text-black'
                  }`}
                  onClick={() => handleSizeFilterChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div> */}
          

        </div>


        <div className='flex-1 flex flex-col'>
          <div className='flex justify-end'>
              <div className='p-2'>
                <div className='bg-white rounded-lg shadow-[0px_0px_10px_rgba(255,255,255,0.8)]'>
              <SortDropdown setSorter={setSorter} />                  
                </div>
              </div>
          </div>


          {category ? (
              <ShoppingList filters={sorters + filters + `&filters[category][$eq]=${category}` + searchQuery} />
            ) : (
              <ShoppingList filters={sorters + filters + searchQuery}  />
            )}

        </div>
      </div>





    </div>
  );
};

export default Shop;
