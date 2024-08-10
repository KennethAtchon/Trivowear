import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state/cart";
import { MdSearch, MdPersonOutline } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import broovielogo from "../../assets/broovielogonew.png";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { MdFavoriteBorder } from "react-icons/md";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth); // Access the isAuth state
  const cart = useSelector((state) => state.cart.cart); 
  const likedItems = useSelector((state) => state.likes.likedItems);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

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
    <div className="w-full h-auto bg-red-100">
      <Banner /> 

      <div className="w-full h-[70px] bg-[#FFFFFF] flex flex-row justify-between">

        <div id="image" className=" h-[60px] w-[180px] ml-16">
            <img
               src={broovielogo} // Replace with the actual path to your logo image
              alt="Broovie Logo"
               onClick={() => navigate("/")}
               className=" cursor-pointer"
            />
        </div>

        <div id="grouper" className=" h-[60px] w-full mr-6 ml-10 flex flex-row justify-between text-[14px] " >
          <div id="navlinks" className=" w-[300px] flex items-center space-x-4  text-[#737373] " >
            <a onClick={() => navigate("/")} className="cursor-pointer"><b>Home</b></a>
            <div className="flex items-center">
            <div className="relative inline-block text-left">
              <button
                className="flex items-center space-x-1"
                onClick={() => navigate("/shop")}
              >
                <b>Shop</b>
              </button>

            
            </div>
            </div>
            <a href="/about"><b>About</b></a>
            <a href="/contact"><b>Contact</b></a>
          </div>

          <div id="icons" className=" w-[350px] flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer mr-10">
            <MdPersonOutline 
                onClick={handleUserIconClick} 
                className={`${isAuth ? "text-xl" : ""}`} 
              />
              {!isAuth && (
                <>
                  <a className="hover:text-black" onClick={() => navigate("/signin")} ><b>Login</b></a>
                  <span><b>/</b></span>
                  <a className="hover:text-black" onClick={() => navigate("/signup")}><b>Register</b></a>
                </>
              )}
            </div>

            <div className="cursor-pointer">
              <MdSearch onClick={toggleSearchBar} />  
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
