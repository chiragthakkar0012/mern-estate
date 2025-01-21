import React from 'react'

export default function CreateListing() {
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required/>
            <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
            <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='62' minLength='10' required/>
            <div className='flex  flex-wrap gap-10'>
            <div className='flex gap-2"'>
                <input type='checkbox' id='sale' className='w-5 mr-2'/>
                <span>Sell</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='rent' className='w-5 mr-2'/>
                <span>Rent</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='parking' className='w-5 mr-2'/>
                <span>Parking spot</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='furnished' className='w-5 mr-2'/>
                <span>Furnished</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='offer' className='w-5 mr-2'/>
                <span>Offer</span>
            </div>
        </div>
        <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='bedRooms'  min='1'  max='10' required className='p-2 border border-gray-300 rounded-lg '/>
                <span>Beds</span>
            </div>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='bathRooms'  min='1'  max='10' required className='p-2 border border-gray-300 rounded-lg '/>
                <span>Baths</span>
            </div>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='regularPrice'  min='1'  max='10' required className='p-3 border w-28  border-gray-300 rounded-lg '/>
                <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>($/month)</span>
                </div>
                
            </div>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='discountPrice'  min='1'  max='10' required className='p-2 border w-28 border-gray-300 rounded-lg '/>
                <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($/month)</span>
                </div>
            </div>
        </div>
        </div>
       <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>Images:
        <span className='font-normal text-gray-700 ml-2'>The First will be cover(max 6)</span>
        </p>
        <div className='flex gap-4'>
            <input  className='p-3 border border-gray-300 rounded-lg w-full' type='file' id='images' accept='image/*' multiple />
            <button className='p-3 text-green-500 rounded-lg border border-green-700 uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
        </div>
        <button className='rounded-lg bg-slate-700 text-white uppercase p-3  hover:opacity-95 disabled:opacity-80'>Create listing</button>
       </div>

    </form>
   </main> 
   )
}
