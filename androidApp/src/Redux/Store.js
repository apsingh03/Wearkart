import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

// Client
import userAuthSlice from './UserSlices/UserAuth';

// Admin
import clientProductSlice from './ClientSlices/clientProductSlice';
import UserCartSlice from './UserSlices/Cart/UserCartRedux';
import favoriteProductSlice from './UserSlices/FavoriteProduct/FavoriteProductSlice';
import clientDebounceSearchSlice from './ClientSlices/clientDebounceSearchSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // The whitelist in redux-persist is used to specify which
  //  slices of the Redux state you want to persist. This
  //  means that only the slices listed in the whitelist
  // will be stored and rehydrated from AsyncStorage
  // (or any storage you are using) when the app is restarted.
  whitelist: ['userAuth', 'client_product', 'user_favoriteProduct'], // List the slices you want to persist
  // to exclude
  // blacklist: ['someTemporarySlice'],
};

// Combine reducers
const rootReducer = combineReducers({
  userAuth: userAuthSlice,
  client_product: clientProductSlice,
  client_debounceSearch: clientDebounceSearchSlice,
  user_userCart: UserCartSlice,
  user_favoriteProduct: favoriteProductSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer directly
  // using this to avoid this Error  - A non-serializable value was detected in an action
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false, // Disable the serializable check
    }),
});

// Create a persistor
export const persistor = persistStore(store);
