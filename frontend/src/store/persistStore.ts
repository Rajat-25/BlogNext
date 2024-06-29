import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blogApi, { blogReducer } from './apis/blogApi';
import userApi, { userReducer } from './apis/userApi';
import blogSlice, { blogSliceReducer } from './slices/blogSlice';
import userSlice, { userSliceReducer } from './slices/userSlice';

 
 const persistConfig = {
   key: 'root',
   storage,
 };


const rootReducer=combineReducers({
    [userApi.reducerPath]: userReducer,
    [blogApi.reducerPath]: blogReducer,
    [userSlice.name]: userSliceReducer,
    [blogSlice.name]: blogSliceReducer,
})

export const persistedReducer = persistReducer(persistConfig, rootReducer);



