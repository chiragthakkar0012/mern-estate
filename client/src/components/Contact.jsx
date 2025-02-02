import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listingData}) {
    const [landlord,setLandord]=useState(null);
    const [message,setMessage]=useState('');
    const handleMessage=(e)=>
    {
      setMessage(e.target.value)
    }
    useEffect(()=>
    {
       const fetchedLandlord=async()=>
       {
        try {
            const res=await fetch(`/api/user/${listingData.userRef}`);
            const data=await res.json();
            if(data.success===false)
            {
                return;
            }
            setLandord(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
       }
       fetchedLandlord();
    },[listingData.userRef])
    console.log(landlord);
  return (
    <>
      {
        landlord && (
          <div className='ml-2 flex flex-col gap-4' >
            <p>Contact <span className='font-semibold'>{landlord.username}</span>
            for <span className='font-semibold'>{listingData.name.toLowerCase()}</span></p>
            <textarea  className='w-full  border p-3 mt-2 rounded-lg ' name="message" id="message" rows="2"  placeholder='Enter your message' value={message} onChange={handleMessage}></textarea>
            <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${landlord.email}&su=Regarding ${listingData.name}&body=${encodeURIComponent(message)}`}  className=' text-center bg-slate-700 p-3 rounded-lg text-white uppercase'>Send Message</Link>
          </div>
        )
      }
    </>
  )
}
