import React from 'react'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
export default function ListingUi({currentuser,listingData,setContact,contact}) {
  return (
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
     <p className='flex items-center  gap-2 text-slate-600 text-sm'>
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
      {
        currentuser &&  listingData.userRef!==currentuser. _id  && !contact && (<button className='w-full bg-slate-700 rounded-lg p-3 text-white uppercase' onClick={()=>setContact(true)}>Contact landord</button>)
      }
      
    </div>
  )
}
