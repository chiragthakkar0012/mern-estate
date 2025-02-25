import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';
import { FaEye ,FaEyeSlash} from "react-icons/fa";
export default function SignUp() {
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [password,setpassword]=useState(true);
  const navigate=useNavigate();
  const handlePassword=(e)=>
  {
    setpassword(!password);
  }
  const handleChange=(e)=>
  {
setFormData({
  ...formData,
  [e.target.id]:e.target.value
})
  }
  const handleFocus=(e)=>
    {
      if(error){setError(null)}
      
    }
    const validateForm=()=>
    {
      const emailRegex=/^[a-zA-Z0-9_+%&]+@gmail\.com$/;
      if(!formData.username){
        setError('UserName is Required');
        return false;
      }
      
      if(!emailRegex.test(formData.email))
      {
        setError('Email is Required');
        return false;
      }
      if((formData.password).length<6)
      {
        setError('Password length greater than 6  is Required');
        return false;
      }
      return true;
    }
const handleSubmit=async (e)=>
{
  e.preventDefault();
  if(!validateForm())return;
  try 
  {
    setLoading(true);
    const res=await fetch('/api/auth/signup',
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
  
            setLoading(false);
            setError(data.message);
          return;
          }
          setLoading(false);
          setError(null);
          navigate('/sign-in');
      console.log(data);
  }
  catch(error)
  {
    setLoading(false);
    setError(error.message);
  }
  
};
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='UserName' className='border p-3 rounded-lg' id='username' onChange={handleChange} onFocus={handleFocus}/>
        <input type='text' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} onFocus={handleFocus}/>
        <div className='relative max-w-lg flex'>
        <input type={password?'password':'text'} placeholder='Password' className='border p-3 rounded-lg flex-grow' id='password' onChange={handleChange} onFocus={handleFocus}/>
        {
          password ? <FaEyeSlash className='absolute top-4 right-2 cursor-pointer' onClick={handlePassword} />:<FaEye  className='absolute top-4 right-2 cursor-pointer' onClick={handlePassword}/>
        }
        </div>
       
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ?'..loading':'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account ?</p>
      <Link to={'/sign-in'}>
        <span className='text-blue-700'>Sign in</span>
      </Link>
      </div>
   
        {error && <p className='text-red-500'>{error}</p>}
      
    </div>
  )
}
