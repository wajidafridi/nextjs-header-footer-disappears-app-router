// @import dependencies
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
// @import Storage
import storage from './storage';
// @import Slices
import authSlice from '@/store/slices/authSlices';

const authPersistConfig = {
  storage,
  key: 'auth',
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export const getState = () => store.getState();
