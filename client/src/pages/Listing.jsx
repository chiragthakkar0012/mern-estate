
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
export default function Listing() {
  const {state}=useLocation()
    console.log('rendering',state);
    const [listingData,setListingData]=useState(state?state:{})
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [copied,setCopied]=useState(false)
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
        listingData && !loading && !error &&  (
          <>
    <div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
      {listingData.imageUrls?.map((url,index)=>
      (
          <SwiperSlide key={url}>
          <div className='h-[400px]' style={{background:`url(${url}) center center / contain no-repeat`,backgroundSize:'cover' }}>
          </div>
          </SwiperSlide>
      ))}
      </Swiper>
    </div>  
    <div className='border rounded-full w-12 h-12 flex items-center justify-center bg-slate-100 cursor-pointer fixed top-[13%] right-[3%] z-10'>
      <FaShare className='text-slate-500' onClick={()=>{
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(()=>{setCopied(false)},2000);
      }}/>
    </div>
    {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
    {/* image slider  */}
    <div className='flex flex-col max-w-4xl mx-auto p-3 my-2 gap-4'>
    <p className='text-2xl font-semibold'>
      {listingData.name}  - ${' '}
      {
       (listingData.type=='rent' && listingData.offer )? listingData.discountPrice:listingData.regularPrice
      }
      {
        listingData.type=='rent' && '/month'
      }
    </p>
     <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
      <FaMapMarkedAlt className='text-green-700'/>
      {listingData.address}
     </p>
     <div className='flex gap-2 items-center'>
      <p className='p-1 text-white text-center w-full max-w-[200px] rounded-md bg-red-900'>
        {listingData.type=='rent'?'For Rent':'For Sale'}
      </p>
      {
        listingData.offer && (<p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
          ${listingData.discountPrice} OFF
        </p>)
      }
     </div>
     <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listingData.description}
    </p>
      <ul className='flex gap-5 flex-wrap'>
        <li className='flex gap-2 text-green-700 items-center text-sm font-semibold'>
          <FaBed className='text-green-700 text-xl'/>
          {listingData.bedRooms>0?listingData.bedRooms:'No'} Beds
        </li>
        <li className='flex gap-1 text-green-700 items-center text-sm font-semibold'>
          <FaBath className='text-green-700 text-xl'/>
          {listingData.bathRooms>0?listingData.bathRooms:'No'} Baths
        </li>
        <li className='flex gap-2 text-green-700 items-center text-sm font-semibold'>
          <FaParking className='text-green-700 text-xl'/>
          {listingData.parking?'Parking':'No Parking'} 
        </li>
        <li className='flex gap-2 text-green-700 items-center text-sm font-semibold'>
          <FaChair className='text-green-700 text-xl'/>
          {listingData.furnished ?'Furnished':'No Furnished'} 
        </li>
      </ul>
    </div>
      </>
     
       )}
    </main>
   
  );
}

  

