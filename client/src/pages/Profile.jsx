import React, { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signOutSuccess } from '../redux/user/user.Slice';
export default function Profile() {
const {currentuser}=useSelector(state=>state.user);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null);
const [image,setImage]=useState('');
const fileRef=useRef(null);
const dispatch=useDispatch();
const navigate=useNavigate();
const handleImage=async(e)=>
{
  console.log(e.target.files[0]);
  const form =new FormData();
  form.append('image',e.target.files[0]);
  try {
    setLoading(true);
    const res=await fetch('/api/auth/upload',{
      method:'POST',
      body:form
    })
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
    setImage(data.image_url);
  } catch (error) {
    
  }
}
const handleSignOut=()=>
{
    dispatch(signOutSuccess());
    navigate('/sign-in')
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile </h1>
      <input type='file' accept='image/*'  id='image' hidden ref={fileRef} onChange={handleImage}/>
      <form className='flex flex-col gap-6'>
        <img src={image ? image:currentuser.avatar}  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  onClick={()=>{fileRef.current.click()}}  />
        {loading ? <span className='text-slate-500 text-center'>Uploading...</span>:''}
        {error ? <span className='text-red-700 text-center'>Failed to Upload</span>:''}
        <input type='text' placeholder='username' className='border p-3 rounded-lg  ' id='username' value={currentuser ? currentuser.username :''}/>
        <input type='text' placeholder='email' className='border p-3 rounded-lg  '  id='email' value={currentuser ?currentuser. email :'' }/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg  ' id='password' />
        <button className='bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between my-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  )
}
