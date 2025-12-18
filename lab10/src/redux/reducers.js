import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addContactToFavorites: (state, action) => {
      const contact = action.payload;
      if (!state.favorites.some(c => c.id === contact.id)) {
        state.favorites.push(contact);
      }
    },
    removeContactFromFavorites: (state, action) => {
      const contactId = action.payload;
      state.favorites = state.favorites.filter(contact => contact.id !== contactId);
    },
    clearFavorites: (state) => {
        state.favorites = []; 
    },
  },
});

export const { 
    addContactToFavorites, 
    removeContactFromFavorites, 
    clearFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;