import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { signInFailure,signInSuccess,signinStart,restart } from '../redux/user/user.Slice.js';
import { useDispatch,useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
export default function SignIn() {
  const [formData,setFormData]=useState({})
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const handleChange=(e)=>
  {
setFormData({
  ...formData,
  [e.target.id]:e.target.value
});
  }
  const handleFocus=(e)=>
  {
    if(error){dispatch(restart());}
    
  }
  
const handleSubmit=async (e)=>
{
  e.preventDefault();
  try 
  {
   dispatch(signinStart());
    const res=await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
    const data=await res.json();
    console.log(data);
    if(data.success===false)
          {
            dispatch(signInFailure(data.message));
          return;
          }
         dispatch(signInSuccess(data));
          navigate('/');
      console.log(data);
  }
  catch(error)
  {
    dispatch(signInFailure(error.message));
  }
  
};
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} onFocus={handleFocus}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} onFocus={handleFocus}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ?'..loading':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an Account ?</p>
      <Link to={'/sign-up'}>
        <span className='text-blue-700'>Sign up</span>
      </Link>
      </div>
   
        {error && <p className='text-red-500'>{error}</p>}
      
    </div>
  )
}
