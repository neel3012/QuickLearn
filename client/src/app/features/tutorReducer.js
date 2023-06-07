import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  value: '',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    addtutordata: (state,action) => {
      state.value=action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addtutordata } = counterSlice.actions

export default counterSlice.reducer