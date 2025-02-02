import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ListingUi from '../components/ListingUi';
import ImageHandler from '../components/ImageHandler';
import Contact from '../components/Contact';
export default function Listing() {
  const {currentuser}=useSelector(state=>state.user);
  const {state}=useLocation()
    console.log('rendering',state);
    const [listingData,setListingData]=useState(state?state:{})
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [copied,setCopied]=useState(false);
    const [contact,setContact]=useState(false);
    console.log(contact)
    const params=useParams();
    useEffect(()=>
    {
     
        const fetchingListing=async()=>
        { if(state) return;
          setLoading(true);
          try 
          { const res=await fetch(`/api/listing/get/${params.listingId}`)
            const data=await res.json();
             if(data.success===false)
             {  
               setError(data.message);
                  return;
             }
             setError(null);
             setListingData(data);
             console.log(data);
           }
            
           catch (error) 
           {
            setError(data.message);
          }
          finally{setLoading(false)}
        }
      fetchingListing();
    },[])
  return (
    <main>
       {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
  {
    listingData && !loading && !error &&  
    (<>
    <ImageHandler listingData={listingData} copied={copied} setCopied={setCopied}/>
    <ListingUi currentuser={currentuser} listingData={listingData} setContact={setContact} contact={contact}/>
    {contact && (<Contact  listingData={listingData}/>)}
    </>
     )} 
    </main>
   
  );
}

  

