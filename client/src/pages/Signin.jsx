import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { signInFailure,signInSuccess,signinStart,restart } from '../redux/user/user.Slice.js';
import { useDispatch,useSelector } from 'react-redux';
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import OAuth from '../components/OAuth.jsx';
export default function SignIn() {
  const [formData,setFormData]=useState({})
  const [password,setpassword]=useState(true);
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handlePassword=(e)=>
    {
      setpassword(!password);
    }
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
  const validateForm=()=>
  {
    const emailRegx=/^[a-zA-Z0-9_+&%]+@gmail\.com$/;
    if(!emailRegx.test(formData.email))
    {
      dispatch(signInFailure('Email is Required'));
      return false
    }
    return true;
  }
const handleSubmit=async (e)=>
{
  e.preventDefault();
  if(!validateForm())return;
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
        <div className='relative max-w-lg flex'>
        <input type={password ?'password':'text'} placeholder='Password' className='border p-3 rounded-lg flex-grow' id='password' onChange={handleChange} onFocus={handleFocus}/>
        {
                  password ? <FaEyeSlash className='absolute top-4 right-2 cursor-pointer' onClick={handlePassword} />:<FaEye  className='absolute top-4 right-2 cursor-pointer' onClick={handlePassword}/>
        }    
        </div>
       
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
