import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state/cart";
import { MdSearch, MdPersonOutline, MdMenu, MdClose } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import './Navbar.css';

function Navbar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth); // Access the isAuth state
  const cart = useSelector((state) => state.cart.cart); 
  const [opacity, setOpacity] = useState(0.9);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(1 - scrollPosition / 300, 0.5); // Adjust the divisor to control how fast the opacity changes
      setOpacity(newOpacity);

      // Clear the previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to reset the opacity after scrolling stops
      scrollTimeout = setTimeout(() => {
        setOpacity(0.9);
        setIsScrolling(false);
      }, 150); // 150ms after scrolling stops
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);


  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserIconClick = () => {
    if (isAuth) {
      navigate("/account");
    } else {
      navigate("/signin");
    }
  };


  const totalItems = cart.reduce((total, item) => total + item.count, 0);

  return (
    <div className="fixed top-0 left-0 right-0 mx-auto rounded-2xl bg-white z-50 h-[70px] mt-8 p-4 shadow-[0px_0px_10px_rgba(255,255,255,0.8)] transition-opacity duration-300" style={{ opacity, animation: 'shadowPulse 2s infinite ease-in-out',     marginLeft: '64px', 
      marginRight: '64px'  }}>

    <SearchBar open={isSearchBarVisible} onClose={toggleSearchBar} />


    {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-50 flex justify-start">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 cursor-pointer"
                onClick={toggleMenu}
              ></div>
              <div className="relative w-40 h-full shadow-lg bg-black">
                <MdClose
                  className="text-2xl ml-2 mt-2 cursor-pointer text-white"
                  onClick={toggleMenu}
                />

                <div
                  id="navlinks"
                  className="mt-6 w-auto flex flex-col items-center space-y-2 text-white "
                >
                  <div
                    onClick={() => {
                      navigate("/");
                      toggleMenu(); // Close the menu when clicking Home
                    }}
                    className="cursor-pointer hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                  >
                    <b>Home</b>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block text-left">
                      <button
                        className="flex items-center space-x-1 hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                        onClick={() => {
                          navigate("/shop");
                          toggleMenu(); // Close the menu when clicking Shop
                        }}
                      >
                        <b>Shop</b>
                      </button>
                    </div>
                  </div>
                  <a
                    href="/about"
                    className="hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                    onClick={toggleMenu} // Close the menu when clicking About
                  >
                    <b>About</b>
                  </a>
                  <a
                    href="/contact"
                    className="hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                    onClick={toggleMenu} // Close the menu when clicking Contact
                  >
                    <b>Contact</b>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}


      <div className="flex items-center justify-between w-full h-full">
        {/* Left section: Navigation Links */}

        <div id="menunavlinks" className=" w-auto md:hidden flex items-center">
          < MdMenu onClick={toggleMenu} className="cursor-pointer hover:text-red-500 hover:bg-gray-200 rounded transition-colors duration-200 text-3xl" />
        </div>


        <div id="navlinks" className="hidden w-auto md:flex items-center space-x-1 text-[#737373] text-sm flex-grow text-black">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
          >
            <b>Home</b>
          </div>
          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <button
                className="flex items-center space-x-1 hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                onClick={() => navigate("/shop")}
              >
                <b>Shop</b>
              </button>
            </div>
          </div>
          <a
            href="/about"
            className="hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
          >
            <b>About</b>
          </a>
          <a
            href="/contact"
            className="hover:text-red-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
          >
            <b>Contact</b>
          </a>
        </div>
  
        {/* Center section: Logo */}
        <div id="logo" className="w-full flex items-center justify-center" onClick={() => navigate("/")}>
          <p className="text-3xl cursor-pointer montserrat bg-gradient-to-r from-red-800 to-black text-transparent bg-clip-text" style={{ fontWeight: 'bold' }} >TRIVOWEAR</p>
        </div>
  
        {/* Right section: Icons */}
        <div id="icons" className="bg flex items-center justify-end text-2xl space-x-6 flex-grow">
          <MdPersonOutline className="mt-1 cursor-pointer hover:text-red-500" onClick={handleUserIconClick}/>
          <MdSearch className="mt-1 cursor-pointer hover:text-red-500" onClick={toggleSearchBar}/>

          <div className="flex items-center space-x-1 ">
            <BsCart2 onClick={() => dispatch(setIsCartOpen(true))} className="mr-1 cursor-pointer hover:text-red-500" />
            <span className="text-xl mt-1 inline-block w-[28px] text-center">{totalItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default Navbar;
