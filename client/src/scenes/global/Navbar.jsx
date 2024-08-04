import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state/cart";
import { MdSearch, MdPersonOutline } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import broovielogo from "../../assets/broovielogonew.png";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";



const Banner = () => {
  return (
    <div className="w-full h-[50px] bg-[#3C403D]">
      {/* You can add more content here if needed */}
    </div>
  );
};


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
            <a onClick={() => navigate("/")}><b>Home</b></a>
            <a href="/shop" className="flex items-center">
              <b >Shop</b> <RiArrowDropDownLine size={28}/>
            </a>
            <a href="/about"><b>About</b></a>
            <a href="/contact"><b>Contact</b></a>
          </div>

          <div id="icons" className=" w-[350px] flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer mr-10">
              <MdPersonOutline onClick={handleUserIconClick} />
              <a className="hover:text-black" onClick={() => navigate("/signin")} ><b>Login</b></a>
              <span><b>/</b></span>
              <a className="hover:text-black" onClick={() => navigate("/signup")}><b>Register</b></a>
            </div>

            <div className="cursor-pointer">
              <MdSearch onClick={toggleSearchBar} />  
              
              <SearchBar open={isSearchBarVisible} onClose={toggleSearchBar} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <BsCart2 onClick={() => dispatch(setIsCartOpen(true))} className=" mr-1"/>
              <span>1</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <MdFavoriteBorder className=" mr-1"/>
              <span>1</span>
            </div>
          </div>

        </div>


      </div>
     
    </div>
  );
}

export default Navbar;


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setIsCartOpen } from "../../state/cart";
// import { MdSearch, MdPersonOutline } from "react-icons/md";
// import { FaShoppingCart } from "react-icons/fa";
// import broovielogo from "../../assets/broovielogonew.png";
// import SearchBar from "./SearchBar"; // Import the SearchBar component

// function Navbar() {
//   const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAuth = useSelector((state) => state.auth.isAuth); // Access the isAuth state
  
//   const toggleSearchBar = () => {
//     setIsSearchBarVisible(!isSearchBarVisible);
//   };

//   const handleUserIconClick = () => {
//     if (isAuth) {
//       navigate("/account");
//     } else {
//       navigate("/signin");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <div className="flex items-center w-full h-16 bg-white bg-opacity-95 text-black fixed top-0 left-0 z-10">
//         <div className="flex justify-between items-center w-full mx-10">
//           {/* Links Section */}
//           <div className="flex items-center space-x-6">
//             <img
//               src={broovielogo} // Replace with the actual path to your logo image
//               alt="Broovie Logo"
//               onClick={() => navigate("/")}
//               className="mr-2 h-16 w-30 cursor-pointer"
//             />
//             <div
//               onClick={() => navigate("/")}
//               className="text-secondary-500 hover:cursor-pointer"
//             >
//               Home
//             </div>
//             <div
//               onClick={() => navigate("/all")}
//               className="text-secondary-500 hover:cursor-pointer"
//             >
//               Shop All
//             </div>
//           </div>

//           {/* Icons Section */}
//           <div className="flex justify-between space-x-5 z-10">
//             <button className="text-black" onClick={toggleSearchBar}>
//               <MdSearch size={24} />
//             </button>
//             <button className="text-black" onClick={handleUserIconClick}>
//               <MdPersonOutline size={24} />
//             </button>
//             <div className="relative">
//               <button
//                 onClick={() => dispatch(setIsCartOpen({}))}
//                 className="text-black mt-1"
//               >
//                 <FaShoppingCart size={22} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Conditionally render the SearchBar component */}
//       <SearchBar open={isSearchBarVisible} onClose={toggleSearchBar} />
//     </div>
//   );
// }

// export default Navbar;
