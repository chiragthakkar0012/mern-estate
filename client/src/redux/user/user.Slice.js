import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentuser:null,
    loading:false,
    error:null
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
          signinStart:(state)=>{state.loading=true},
          signInSuccess:(state,action)=>
          {
            state.currentuser=action.payload;
            state.loading=false;
            state.error=null;
          },
          signInFailure:(state,action)=>
          {
            state.loading=false;
            state.error=action.payload;
          },
          restart:(state,action)=>
          {
            state.error=null;
          }
           
          
    }
})
export  const {signInFailure,signinStart,signInSuccess,restart}=userSlice.actions;

export default userSlice.reducer;