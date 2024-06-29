import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user_slice',
  initialState: {
    isUserLoggedIn: false,
    token: '',
    currentUser: {},
  },
  reducers: {
    logInUser: (
      state,
      action: PayloadAction<{ token: string; data: CurrUserType }>
    ) => {
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
      state.currentUser = action.payload.data;
    },

    logOutUser: (state) => {
      state.token = '';
      state.isUserLoggedIn = false;
      localStorage.removeItem('token');
      state.currentUser = {};
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;
const userSliceReducer = userSlice.reducer;
export { userSliceReducer };
export default userSlice;
