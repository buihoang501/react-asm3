//Import from @redux toolkit
import { createSlice } from '@reduxjs/toolkit';

//Initialize auth state
const initialAuthState = {
  isLogin: false,
  user: null,
};

//Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    //Set on login
    onLogin(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    onLogout(state, action) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

//export auth actions
export const authActions = authSlice.actions;

//export default auth slice reducer
export default authSlice.reducer;
