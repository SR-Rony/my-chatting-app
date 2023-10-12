import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
  },
  reducers: {
    userInfo: (state,action) => {
      state.value = action.payload;
      console.log(action);
    },
  },
})

// Action creators are generated for each case reducer function
export const { userInfo,} = userSlice.actions

export default userSlice.reducer