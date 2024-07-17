import { useSelector, useDispatch } from "react-redux";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";
import constants from "../../constants.json"; // Adjust the path as per your project structure

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  console.log(cart)

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0).toFixed(2);

  return (
    <div
      className={`${
        isCartOpen ? "block" : "hidden"
      } bg-black bg-opacity-40 fixed z-10 w-full h-full left-0 top-0 overflow-auto`}
    >
      <div className="fixed right-0 bottom-0 w-max-400px h-full bg-white">
        <div className="p-30px overflow-auto h-full">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-15px">
            <h3 className="text-3xl">SHOPPING BAG ({cart.length})</h3>
            <button onClick={() => dispatch(setIsCartOpen({}))}>
              <FiX className="text-black" />
            </button>
          </div>

          {/* CART LIST */}
          <div>
            {cart.map((item) => (
              <div key={`${item.attributes.name}-${item.id}`}>
                <div className="flex p-15px">
                  <div className="flex-1">
                    <img
                      alt={item?.name}
                      className="w-123px h-164px"
                      src={`${constants.backendUrl}${item?.attributes?.images?.data[0]?.attributes?.formats?.medium?.url}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-5px">
                      <h4 className="font-bold">{item.attributes.name}</h4>
                      <button
                        onClick={() => dispatch(removeFromCart({ id: item.id }))}
                      >
                        <FiX className="text-black" />
                      </button>
                    </div>
                    <p>{item.attributes.shortDescription[0].children[0].text}</p>
                    <div className="flex items-center m-15px">
                      <div className="flex items-center border-1.5px border-neutral-500">
                        <button
                          onClick={() => dispatch(decreaseCount({ id: item.id }))}
                        >
                          <FiMinus className="text-black" />
                        </button>
                        <p>{item.count}</p>
                        <button
                          onClick={() => dispatch(increaseCount({ id: item.id }))}
                        >
                          <FiPlus className="text-black" />
                        </button>
                      </div>
                      <p className="font-bold ml-4">${item.attributes.price}</p>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="m-20px">
            <div className="flex items-center justify-between m-20px">
              <p className="font-bold">SUBTOTAL</p>
              <p className="font-bold">${totalPrice}</p>
            </div>
            <button
              className="bg-primary-400 text-white rounded-none w-full py-5 px-10 m-20px 0"
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartMenu;
