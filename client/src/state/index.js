import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import authReducer from './auth';

// Middleware to save state to localStorage
const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('cartState', JSON.stringify(state.cart));
  localStorage.setItem('authState', JSON.stringify(state.auth));
  return result;
};

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const cartState = localStorage.getItem('cartState');
    const authState = localStorage.getItem('authState');
    return {
      cart: cartState ? JSON.parse(cartState) : { isCartOpen: false, cart: [], items: [] },
      auth: authState ? JSON.parse(authState) : { isAuth: false, token: null },
    };
  } catch (e) {
    console.warn('Could not load state from localStorage', e);
    return {
      cart: { isCartOpen: false, cart: [], items: [] },
      auth: { isAuth: false, token: null },
    };
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: loadFromLocalStorage(), // Initialize state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage), // Use middleware
});

export { store };
