import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state/cart";
import { MdSearch, MdPersonOutline, MdFavoriteBorder, MdMenu, MdClose } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import broovielogo from "../../assets/broovielogonew.png";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import LikeMenu from "./LikeMenu"; 
import { setIsLikeMenuOpen } from "../../state/likes";

const Banner = () => {
  return (
    <div className="w-full h-[40px] bg-[#3C403D]">
      {/* You can add more content here if needed */}
    </div>
  );
};

function Navbar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isLikeMenuOpen, setIsLikeMenuOpenState] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth); // Access the isAuth state
  const cart = useSelector((state) => state.cart.cart); 
  const likedItems = useSelector((state) => state.likes.likedItems);

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

  const handleLikeIconClick = () => {
    setIsLikeMenuOpenState(!isLikeMenuOpen);
    dispatch(setIsLikeMenuOpen(!isLikeMenuOpen)); // Update Redux state
  };

  const totalItems = cart.reduce((total, item) => total + item.count, 0);

  return (
    <div className="w-full h-auto ">
      <Banner /> 

      <div className="w-full h-[70px] bg-[#FFFFFF] flex flex-row justify-between">

        <div id="image" className="hidden sm:block h-[60px] w-[180px] ml-6 lg:ml-16 flex items-center">
            <img
               src={broovielogo} // Replace with the actual path to your logo image
              alt="Broovie Logo"
               onClick={() => navigate("/")}
               className=" cursor-pointer object-fit"
            />
        </div>

        <div className="sm:hidden flex justify-between items-center ml-6">
          < MdMenu className="text-xl cursor-pointer" onClick={toggleMenu}/>
        </div>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-50 flex justify-start">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 cursor-pointer"
                onClick={toggleMenu}
              ></div>
              <div className="relative bg-white w-40 h-full shadow-lg">
                <MdClose
                  className="text-2xl ml-2 mt-2 cursor-pointer"
                  onClick={toggleMenu}
                />

                <div id="image" className="h-[60px] w-auto mt-8">
                  <img
                    src={broovielogo} // Replace with the actual path to your logo image
                    alt="Broovie Logo"
                    onClick={() => {
                      navigate("/");
                      toggleMenu(); // Close the menu when clicking the logo
                    }}
                    className="cursor-pointer object-fit"
                  />
                </div>

                <div
                  id="navlinks"
                  className="mt-6 w-auto flex flex-col items-center space-y-2 text-[#737373]"
                >
                  <div
                    onClick={() => {
                      navigate("/");
                      toggleMenu(); // Close the menu when clicking Home
                    }}
                    className="cursor-pointer hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                  >
                    <b>Home</b>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block text-left">
                      <button
                        className="flex items-center space-x-1 hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
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
                    className="hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                    onClick={toggleMenu} // Close the menu when clicking About
                  >
                    <b>About</b>
                  </a>
                  <a
                    href="/contact"
                    className="hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                    onClick={toggleMenu} // Close the menu when clicking Contact
                  >
                    <b>Contact</b>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}


        <div id="grouper" className=" h-[60px] w-full mr-6 ml-10 flex flex-row justify-end sm:justify-between text-[14px] " >
        <div id="navlinks" className="hidden w-auto sm:flex items-center space-x-2 text-[#737373]">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
          >
            <b>Home</b>
          </div>
          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <button
                className="flex items-center space-x-1 hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
                onClick={() => navigate("/shop")}
              >
                <b>Shop</b>
              </button>
            </div>
          </div>
          <a
            href="/about"
            className="hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
          >
            <b>About</b>
          </a>
          <a
            href="/contact"
            className="hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-200"
          >
            <b>Contact</b>
          </a>
        </div>


          <div id="icons" className=" w-auto flex items-center justify-end space-x-4">
            
            <div className={`flex items-center space-x-2 cursor-pointer ${isAuth ? "" : "mr-0 md:mr-10"}`}>
              <MdPersonOutline 
                onClick={handleUserIconClick} 
                className={`${isAuth ? "text-xl" : ""}`} 
              />
              {!isAuth && (
                <>
                  <div className="hover:text-black" onClick={() => navigate("/signin")} ><b>Login</b></div>
                  <span><b>/</b></span>
                  <div className="hover:text-black" onClick={() => navigate("/signup")}><b>Register</b></div>
                </>
              )}
            </div>

            <div className="cursor-pointer">
              <MdSearch onClick={toggleSearchBar} className="mt-1" />  
              <SearchBar open={isSearchBarVisible} onClose={toggleSearchBar} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <BsCart2 onClick={() => dispatch(setIsCartOpen(true))} className=" mr-1"/>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleLikeIconClick}>
              <MdFavoriteBorder className=" mr-1"/>
              <span>{likedItems.length}</span>
            </div>
          </div>

        </div>

      </div>
      <LikeMenu /> 
    </div>
  );
}

export default Navbar;
