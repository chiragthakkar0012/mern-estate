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
          },
          signOutStart:(state)=>
          {
            state.loading=true;
          },
          signOutSuccess:(state)=>
          {
            state.currentuser=null;
            state.loading=false;
            state.error=null;
          },
          signOutFailure:(state,action)=>
          {
            state.error=action.payload;
            state.loading=false;
          },
          updateUserStart:(state)=>
          {
            state.loading=true;
          },
          updateUserSuccess:(state,action)=>
          {
            state.loading=false;
            state.error=null;
            state.currentuser=action.payload;
          },
          updateUserFailure:(state,action)=>
          {
            state.error=action.payload;
            state.loading=false

          },
          deleteUserStart:(state)=>
          {
            state.loading=true;
          },
          deleteUserSuccess:(state)=>
          {
           state.currentuser=null;
           state.loading=false;
           state.error=null;
          },
          deleteUserFailure:(state,action)=>
          {
            state.loading=false;
            state.error=action.payload;
          }
           
          
    }
})
export  const 
{signInFailure,signinStart,signInSuccess,restart,signOutSuccess,updateUserFailure,updateUserSuccess,updateUserStart
  ,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutFailure,signOutStart
}=userSlice.actions;

export default userSlice.reducer;