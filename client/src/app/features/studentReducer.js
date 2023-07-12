import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  value: {},
  // accessToken:null,
  // refreshToken:null,
  studentpresnet:false
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    
    addstudentdata: (state,action) => {
      state.value=action.payload
    },
    isStudentAuthenticated:(state)=>{
      state.studentpresnet=true;
  //     state.accessToken = action.payload.accessToken;
  // state.refreshToken = action.payload.refreshToken;
    },
    isStudentnotAuthenticated:(state)=>{
      state.studentpresnet=false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addstudentdata,isStudentAuthenticated,isStudentnotAuthenticated } = studentSlice.actions
export const sendStudentdata=(state)=>state.student.value;
export const checkStudentAuthentication=(state)=>state.student.studentpresnet;



export default studentSlice.reducer