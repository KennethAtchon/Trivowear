import { createSlice } from '@reduxjs/toolkit';

const likesSlice = createSlice({
  name: 'likes',
  initialState: { likedItems: [], isLikeMenuOpen: false },
  reducers: {
    addToLikes: (state, action) => {
      const item = action.payload;
      if (!state.likedItems.find(like => like.id === item.id)) {
        state.likedItems.push(item);
      }
    },
    removeFromLikes: (state, action) => {
      state.likedItems = state.likedItems.filter(like => like.id !== action.payload.id);
    },
    setIsLikeMenuOpen: (state, action) => {
      state.isLikeMenuOpen = action.payload;
    },
  },
});

export const { addToLikes, removeFromLikes, setIsLikeMenuOpen } = likesSlice.actions;
export default likesSlice.reducer;
