import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import blogApi from './apis/blogApi';
import userApi from './apis/userApi';
import { persistedReducer } from './persistStore';
import userSlice from './slices/userSlice';
userSlice;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(blogApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export * from './apis/blogApi';
export * from './apis/userApi';
export * from './slices/blogSlice';
export * from './slices/userSlice';
export default store;
