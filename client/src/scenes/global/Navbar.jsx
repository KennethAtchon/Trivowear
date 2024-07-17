import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import { MdSearch, MdPersonOutline, MdShoppingBag, MdMenu } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="flex items-center w-full h-16 bg-white bg-opacity-95 text-black fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center w-4/5 mx-auto">
        <div
          onClick={() => navigate("/")}
          className="text-secondary-500 hover:cursor-pointer"
        >
          ECOMMER
        </div>
        <div className="flex justify-between space-x-5 z-10">
          <button className="text-black">
            <MdSearch size={24} />
          </button>
          <button className="text-black">
            <MdPersonOutline size={24} />
          </button>
          <div className="relative">
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 text-xs bg-secondary-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
            <button
              onClick={() => dispatch(setIsCartOpen({}))}
              className="text-black"
            >
              <MdShoppingBag size={24} />
            </button>
          </div>
          <button className="text-black">
            <MdMenu size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
