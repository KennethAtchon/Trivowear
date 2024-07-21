import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state/cart";
import { MdSearch, MdPersonOutline } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import broovielogo from "../../assets/broovielogonew.png";
import SearchBar from "./SearchBar"; // Import the SearchBar component

function Navbar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth); // Access the isAuth state
  
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

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center w-full h-16 bg-white bg-opacity-95 text-black fixed top-0 left-0 z-10">
        <div className="flex justify-between items-center w-full mx-10">
          {/* Links Section */}
          <div className="flex items-center space-x-6">
            <img
              src={broovielogo} // Replace with the actual path to your logo image
              alt="Broovie Logo"
              onClick={() => navigate("/")}
              className="mr-2 h-16 w-30 cursor-pointer"
            />
            <div
              onClick={() => navigate("/")}
              className="text-secondary-500 hover:cursor-pointer"
            >
              Home
            </div>
            <div
              onClick={() => navigate("/all")}
              className="text-secondary-500 hover:cursor-pointer"
            >
              Shop All
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex justify-between space-x-5 z-10">
            <button className="text-black" onClick={toggleSearchBar}>
              <MdSearch size={24} />
            </button>
            <button className="text-black" onClick={handleUserIconClick}>
              <MdPersonOutline size={24} />
            </button>
            <div className="relative">
              <button
                onClick={() => dispatch(setIsCartOpen({}))}
                className="text-black mt-1"
              >
                <FaShoppingCart size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the SearchBar component */}
      <SearchBar open={isSearchBarVisible} onClose={toggleSearchBar} />
    </div>
  );
}

export default Navbar;
