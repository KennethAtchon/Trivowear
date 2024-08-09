import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import authReducer from './auth';
import likesReducer from './likes'; // Import the likes reducer

// Middleware to save state to localStorage
const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('cartState', JSON.stringify(state.cart));
  localStorage.setItem('authState', JSON.stringify(state.auth));
  localStorage.setItem('likesState', JSON.stringify(state.likes)); // Save likes state
  return result;
};

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const cartState = localStorage.getItem('cartState');
    const authState = localStorage.getItem('authState');
    const likesState = localStorage.getItem('likesState');
    return {
      cart: cartState ? JSON.parse(cartState) : { isCartOpen: false, cart: [], items: [] },
      auth: authState ? JSON.parse(authState) : { isAuth: false, token: null },
      likes: likesState ? JSON.parse(likesState) : { likedItems: [], isLikeMenuOpen: false }, // Initialize likes state
    };
  } catch (e) {
    console.warn('Could not load state from localStorage', e);
    return {
      cart: { isCartOpen: false, cart: [], items: [] },
      auth: { isAuth: false, token: null },
      likes: { likedItems: [], isLikeMenuOpen: false }, // Default likes state
    };
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    likes: likesReducer, // Add likes reducer
  },
  preloadedState: loadFromLocalStorage(), // Initialize state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage), // Use middleware
});

export { store };
