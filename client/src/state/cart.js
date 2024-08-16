import { createSlice } from '@reduxjs/toolkit';

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { isCartOpen: false, cart: [], items: [], selectedShipping: '', selectedShippingPrice: 0 },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((cartItem) => {
        const { id: actionItemId, selected: actionSelectedProduct } = action.payload;
        const { id: cartItemId, attributes: { selectedProduct } } = cartItem;

        console.log(actionItemId, cartItemId)
        console.log(actionSelectedProduct, JSON.stringify(selectedProduct))

        return (cartItemId !== actionItemId || JSON.stringify(selectedProduct) !== actionSelectedProduct);
      })
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && 
          JSON.stringify(item.attributes.selectedProduct) === 
          action.payload.selected) {

            item.count++

        }
        return item;
      });
    },
    increaseCountByNumber: (state, action) => {
      console.log(action.payload.countcart)
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && 
          JSON.stringify(item.attributes.selectedProduct) === 
          action.payload.selected) {

            item.count = item.count +  action.payload.countcart

        }
        return item;
      });
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && 
          JSON.stringify(item.attributes.selectedProduct) === 
          action.payload.selected && item.count > 1) {
            item.count--
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    updateShippingInCart: (state, action) => {
      state.selectedShipping = action.payload.selectedShipping;
      state.selectedShippingPrice = action.payload.selectedShippingPrice;
    },
    clearCart: (state) => {
      state.cart = [];
      state.selectedShipping = '';
      state.selectedShippingPrice = 0;
      // Optionally clear items too if needed
      state.items = [];
    },
  },
});

export const { setItems, addToCart, removeFromCart, increaseCount, increaseCountByNumber, decreaseCount, setIsCartOpen, updateShippingInCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
