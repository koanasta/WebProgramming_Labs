import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './reducers';


const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;