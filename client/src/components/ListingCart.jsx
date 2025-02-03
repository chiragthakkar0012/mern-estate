import React from 'react'
import {MdLocationOn} from 'react-icons/md';
import { Link } from 'react-router-dom';
export default function ListingCart({listing})  {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`} state={listing}>
          <img src={listing.imageUrls[0]} className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition:scale  duration-300'/>
          <div className='p-3 flex flex-col gap-2'> 
            <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
            <div className='flex gap-2 items-center w-full'>
                <MdLocationOn className='text-green-700 h-4 w-4'/>
                <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
            </div>
           <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
           <p className='text-slate-500 mt-2 flex items-centerfont-semibold '>
           ${' '}
           {listing.offer ? (+listing.regularPrice - +listing.discountPrice.toLocaleString('en-US')):+listing.regularPrice.toLocaleString('en-US')}
           {listing.type==='rent' && '  / month'}
           </p>
          <div className='text-slate-700 flex gap-3'>
             <div className='font-bold text-sm'>
                {listing.bedRooms>0 ? `${listing.bedRooms}`:'0'} Beds
             </div>
             <div className='font-bold text-sm'>
                {listing.bathRooms>0 ? `${listing.bathRooms}`:'0'} Baths
             </div>
          </div>
          </div>
       </Link>
   
    </div>
  
    
  )
}


