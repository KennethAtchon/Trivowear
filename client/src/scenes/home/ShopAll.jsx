import React, { useEffect, useState } from "react";
import ShoppingList from './ShoppingList';
import shopall from "../../assets/shopallbg.jpg";
import { GrNext } from "react-icons/gr";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { IoOptionsOutline } from "react-icons/io5";
import Checkbox from '@mui/material/Checkbox';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useParams, useNavigate } from 'react-router-dom';

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
    <div className="">
      <div className="p-2 flex flex-row items-center cursor-pointer" onClick={toggleDropdown}>
        <div>{selectedOption}</div>
        <RiArrowDropDownLine size={28} />
      </div>
      {isOpen && (
        <div className=" absolute z-50  mt-2 bg-white border rounded-lg shadow-md ">
          <div className="p-2 hover:bg-gray-200 cursor-pointer pr-4" onClick={() => handleOptionClick('Price: Low to High')}>Price: Low to High</div>
          <div className="p-2 hover:bg-gray-200 cursor-pointer pr-4" onClick={() => handleOptionClick('Price: High to Low')}>Price: High to Low</div>
          <div className="p-2 hover:bg-gray-200 cursor-pointer pr-4" onClick={() => handleOptionClick('Newest Arrivals')}>Newsest Arrivals</div>
        </div>
      )}
    </div>
  );
};

const Shop = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState("");
  const [sorters, setSorter] = useState("");
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

  console.log(sorters)


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
    <div className="mx-28">
      <div 
        id="home-page" 
        className=' bg-[#FAFAFA] relative'
        style={{ 
          backgroundImage: `url(${shopall})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px' // Adjust as needed
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <p className="text-4xl font-bold">
        <Breadcrumbs
          separator={<GrNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <div>Home</div>
          <div>Shop</div>
          {category && 
            <div>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</div>
          }
          
        </Breadcrumbs>


        </p>
          <h1 className="text-4xl font-bold text-[#000000] mt-10 pb-2">Shop Page</h1>
          <p className="mt-4 text-lg text-[#121212]">Let’s design the place you always imagined.</p>
        </div>
      </div>

      <div className='flex flex-row pt-16 '>

        <div className=' w-[200px] text-[20px] pl-2'>
          <div className='flex flex-row mt-2'>
          <IoOptionsOutline className='mt-1 mr-2' />
          <div>Filter</div>
          </div>

          <div className='mt-6'>
            <div id="title" className="text-[14px]">CATEGORIES</div>
            <div id="container" className="text-[#807E7E] text-[14px] mt-2  flex flex-col gap-1">
              <div onClick={() => handleCategoryClick('appliances')} className="cursor-pointer">Appliances</div>
              <div onClick={() => handleCategoryClick('fitness')} className="cursor-pointer">Fitness</div>
              <div onClick={() => handleCategoryClick('kitchen')} className="cursor-pointer">Kitchen</div>
            </div>
          </div>

          <div className='mt-6'>
            <div id="title" className="text-[14px]">PRICE</div>
            <div id="container" className="text-[#807E7E] text-[14px] mt-2 flex flex-col gap-1 mr-3">
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

        </div>


        <div className='flex-1 flex flex-col'>
          <div className='flex justify-between mb-6 mx-6'>
            <div className=' p-2'>
            {category ? (
              <h2>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</h2>
            ) : (
              <h2>Shop All</h2>
            )}
            </div>
              <div className=' p-2 flex flex-row'>
              <SortDropdown setSorter={setSorter} />
              </div>
          </div>


          {category ? (
              <ShoppingList filters={sorters + filters + `&filters[category][$eq]=${category}`} />
            ) : (
              <ShoppingList filters={sorters + filters} />
            )}

        </div>
      </div>





    </div>
  );
};

export default Shop;
