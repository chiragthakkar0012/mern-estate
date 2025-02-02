import React, { useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  signOutSuccess } from '../redux/user/user.Slice';
import { updateUserFailure,updateUserStart,updateUserSuccess,restart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutFailure,signOutStart } from '../redux/user/user.Slice.js';
export default function Profile() {
const {currentuser,loading,error}=useSelector(state=>state.user);
const [Loading,setLoading]=useState(false);
const [Error,setError]=useState(null);
const [ShowListingError,setShowListingError]=useState(null);
const [image,setImage]=useState('');
const [formData,setFormData]=useState({});
const [update,setUpdate]=useState(false);
const fileRef=useRef(null);
const [ShowlistingData,setShowListingData]=useState(null);
const dispatch=useDispatch();
const navigate=useNavigate();
const handleListingDelete=async(id)=>
{
  try 
  {
     const res=await fetch(`/api/listing/delete/${id}`,
      {
        method:'DELETE'
      }
     );
     const data=await res.json();
     if(data.success===false)
     {
      return;
     }
     const updatedListings=ShowlistingData.filter(dat=>dat._id!==id);
     setShowListingData(updatedListings);
  }
  catch(error)
  {
       setShowListingError(error.message);
  }
}
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
    setFormData({...formData,avatar:data.image_url});
  } catch (error) {
    setLoading(false);
    setError(error);
  }
}
const handleSignOut=async()=>
{
    try 
    {
        dispatch(signOutStart());
        const res=await fetch('/api/auth/signout');
        const data=await res.json();
        if(data.success===false)
        {
          dispatch(signOutFailure(data.message));
          return;
        }
        dispatch(signOutSuccess());
      
    } catch (error) 
    {
      dispatch(signOutFailure(data.message));
    }
    dispatch(signOutSuccess());
    navigate('/sign-in')
}
const handleChange=(e)=>
{
  setFormData({...formData,[e.target.id]:e.target.value})
}
const handleSubmit=async(e)=>
{
 e.preventDefault();
 try
 {
    dispatch(updateUserStart());
    const res=await fetch(`api/user/update/${currentuser._id}`,{
      method:'POST',
      headers:
      {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const data=await res.json()
    if(data.success===false)
    {
      dispatch(updateUserFailure(data.message));
      setUpdate(false);
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdate(true);
 }
 catch(err)
 {
  dispatch(updateUserFailure(err.message));
  setUpdate(false);
 }
}
const handleError=(e)=>
{
  if(error)
  {
    dispatch(restart())
  }
  if(ShowListingError)
  {
    setShowListingError(null);
  }
}
const handleDelete=async(e)=>
{
  try 
  {
    dispatch(deleteUserStart());
    const res=await fetch(`/api/user/delete/${currentuser._id}`,{
      method:'DELETE',
    });
    const data=await res.json();
    if(data.success===false)
    {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}
const handleShowListings=async(e)=>
{
  try {
    setShowListingError(null);
    
    const res=await fetch(`/api/user/listings/${currentuser._id}`)
    const data=await res.json();
    if(data.success==false)
    {
      setShowListingError(data.message);
      return;
    }
    setShowListingData(data);
  } catch (error) {
    setShowListingError(error.message);
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile </h1>
      <input type='file' accept='image/*'  id='image' hidden ref={fileRef} onChange={handleImage}/>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit} onFocus={handleError}>
        <img src={image ? image:currentuser.avatar}  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  onClick={()=>{fileRef.current.click()}}  />
        {Loading ? <span className='text-slate-500 text-center'>Uploading...</span>:<span></span>}
        {Error ? <span className='text-red-700 text-center'>Failed to Upload</span>:<span></span>}
        <input type='text' placeholder='username' className='border p-3 rounded-lg  ' id='username' value={ formData.username?formData.username :currentuser.username} onChange={handleChange}/>
        <input type='text' placeholder='email' className='border p-3 rounded-lg  '  id='email' value={formData.email?formData.email:currentuser.email } onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg  ' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Update'}</button>
        <Link to={"/create-listing"} className='bg-green-700 rounded-lg text-white uppercase block p-3 text-center hover:opacity-95'>Create Listing</Link>
      </form>
      <div className='flex justify-between  my-5'>
        <span className='text-red-500 cursor-pointer' onClick={handleDelete}>Delete Account</span>
        <span className='text-red-500 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
        </div>
        <p className='text-red-700 my-5'>{error?error:''}</p>
        <p className='text-green-700 my-5'>{update?'Success':''}</p>
        <button onClick={handleShowListings}  className='text-green-700  w-full'>Show Listings</button>
        {
          ShowListingError ? <span className='text-red-500 text-center'>{ShowListingError}</span>:''
        }
        
        {
          ShowlistingData && ShowlistingData.length>0 && 
          <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-center text-2xl text-slate-500 mt-7'>Yours Listings</h1>
            {
              ShowlistingData.map(list=>(
              <div className='border rounded-lg p-3 flex justify-between items-center gap-4' key={list._id} >
              <Link to={`/listing/${list._id}`} state={list}>
                  <img src={list.imageUrls[0]} className='h-16 w-18 object-contain '/>
                </Link>
              <Link   state={list} className='text-slate-700 font-semibold hover:underline truncate flex-1' to={`/listing/${list._id}`}>
                  <p >{list.name}</p>
                </Link>
                <div className='flex flex-col gap-2'>
                   <button  onClick={()=>handleListingDelete(list._id)} className='text-red-500 uppercase' id=''>Delete</button>
                   <Link to={`/update-listing/${list._id}`} state={list}><button className='text-green-500 uppercase pl-2'>Edit</button></Link>
                   
                </div>
              </div>
            ))   
            }
          </div>
            
          
        }
    </div>
  )
}
