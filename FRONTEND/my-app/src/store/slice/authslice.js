import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  isAuthenticated:false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action)=>{
        state.user = action.payload
        state.isAuthenticated= true;
    },
    logout: (state,action)=>{
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
        state.user = null;
        state.isAuthenticated= false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login,logout } = authSlice.actions

export default authSlice.reducer