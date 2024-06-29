import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logOutUser } from './userSlice';

const blogSlice = createSlice({
  name: 'blog_slice',
  initialState: {
    currentBlog: {},
  },
  reducers: {
    currentBlog: (state, action: PayloadAction<{ blog: BlogResponseType }>) => {
      state.currentBlog = action.payload.blog;
    },
  },
  extraReducers(builder) {
    builder.addCase(logOutUser, (state) => {
      state.currentBlog = {};
    });
  },
});

export const { currentBlog } = blogSlice.actions;
export const blogSliceReducer = blogSlice.reducer;
export default blogSlice;
