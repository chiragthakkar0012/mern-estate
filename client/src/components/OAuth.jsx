import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/user.Slice.js';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async(e)=>
   {
          try 
          {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
            const res=await fetch('/api/auth/google',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
                }
            );
            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate('/')

          }
          catch(err)
          {
            console.log('could not sign in with google',err)
          }
   }
  return (
    <button  type='button' onClick={handleGoogleClick} className='bg-red-700 p-3 text-white rounded-lg uppercase hover:opacity-95'>CONTINUE WITH GOOGLE</button>
  )
}
