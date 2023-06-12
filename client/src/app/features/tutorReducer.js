import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  value: {},
  tutorpresnet:false
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    addtutordata: (state,action) => {
      state.value=action.payload
    },
    isTutorAuthenticated:(state)=>{
      state.tutorpresnet=true;
    },
    isTutornotAuthenticated:(state)=>{
      state.tutorpresnet=false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addtutordata,isTutorAuthenticated,isTutornotAuthenticated } = counterSlice.actions
export const sendtutordata=(state)=>state.counter.value;
export const checkTutorAuthentication=(state)=>state.counter.tutorpresnet;

export default counterSlice.reducer