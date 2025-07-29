import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setUserDetails: (state, action) => {
      const { user } = action.payload;
      state.token = user?.token;
      state.isLoggedIn = !!user?.token;
    },
  },
});

export const { setUserDetails, reset } = userSlice.actions;

export default userSlice.reducer;
