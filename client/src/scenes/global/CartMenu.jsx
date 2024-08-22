import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from "../../state/cart";
import { useNavigate } from "react-router-dom";
import constants from "../../constants.json"; // Adjust the path as per your project structure

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  console.log(cart);

  // Calculate total price considering if an item is on sale
  const totalPrice = cart.reduce((total, item) => {
    const price = item.attributes.onSale ? item.attributes.discount : item.attributes.price;
    return total + item.count * price;
  }, 0).toFixed(2);

  const handleCheckout = () => {
    dispatch(setIsCartOpen({})); // Close the cart
    navigate('/checkout'); // Navigate to the checkout page
  };

  const handleRemoveFromCart = (item) => {
    console.log("item id: ", item.id);
    console.log("selected: ", JSON.stringify(item.attributes.selectedProduct));
    dispatch(removeFromCart({ 
      id: item.id, 
      selected: JSON.stringify(item.attributes.selectedProduct) 
    }));
  };

  return (
    <div className={`fixed inset-0 z-50 flex justify-end ${isCartOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => dispatch(setIsCartOpen({}))}></div>
      <div className="relative bg-black text-white w-96 h-full shadow-lg border-l">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <FiX className="cursor-pointer" onClick={() => dispatch(setIsCartOpen({}))} />
        </div>
        <div className="p-4 overflow-y-auto max-h-[90vh] verticalscroll">
          {cart.map((item) => {
            const price = item.attributes.onSale ? item.attributes.discount : item.attributes.price;

            return (
              <div key={item.id} className="flex justify-between mb-4">
                <div className="flex flex-row">
                  <div className="w-[120px] h-[96px]">
                    {item && (
                      <img
                        alt={item.name}
                        className="w-full h-full object-stretch rounded-xl"
                        src={`${constants.backendUrl}${item.attributes.images.data[0].attributes.url}`}
                      />
                    )}
                  </div>

                  <div className="ml-3 w-full">
                    <h3 className="font-semibold text-[14px] mb-2">{item.attributes.name}</h3>
                    <div id="options" className="text-[12px] mb-2">
                      {item.attributes.selectedProduct && (
                        <>
                          {Object.entries(item.attributes.selectedProduct).map(([key, value], index) => (
                            <div key={index}>
                              {key}: {value}
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center border border-[#6C7275] p-1 rounded-lg">
                        <FiMinus
                          className="cursor-pointer"
                          onClick={() => dispatch(decreaseCount({ id: item.id, selected: JSON.stringify(item.attributes.selectedProduct) }))}
                        />
                        <span className="mx-4">{item.count}</span>
                        <FiPlus
                          className="cursor-pointer"
                          onClick={() => dispatch(increaseCount({ id: item.id, selected: JSON.stringify(item.attributes.selectedProduct) }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end pl-3">
                  <span className="mb-2">${(item.count * price).toFixed(2)}</span>
                  <FiX className="cursor-pointer text-lg" onClick={() => handleRemoveFromCart(item)} />
                </div>
              </div>
            );
          })}

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
