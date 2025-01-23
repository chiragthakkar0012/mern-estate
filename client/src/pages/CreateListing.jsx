
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
export default function CreateListing() 
{
    const navigate=useNavigate();
    const [files,setFiles]=useState([]);
    const [uploading,setUpLoading]=useState(false);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [formError,setFormError]=useState(null);
    const {currentuser}=useSelector(state=>state.user);
    const [listingData,setListingData]=useState({imageUrls:[],
       type:'rent',
       parking:false,
       furnished:false,
       offer:false,
       userRef:currentuser._id,
       discountPrice:0
    })
    const filRef=useRef(null);
  
   const handleFormChange=(e)=>
   {  const {id,type,checked,value}=e.target;
   if(type==='checkbox')
   {   if(id=='rent' || id=='sale')
      {
        setListingData({...listingData,type:id});
        return;
       }
        setListingData({...listingData,[id]:checked});
   }
   else 
   {
    setListingData({...listingData,[id]:value});
   }
   }
    const handleImageSubmit=async(e)=>
    {
          if(files.length>0 && listingData.imageUrls.length+files.length<=6 )
          {
            const formData=new FormData();
            files.forEach(file=>formData.append('image',file));
            setUpLoading(true);
            const res=await fetch('/api/listing/imageUpload',
                {
                    method:'POST',
                    body:formData
                }
            );
            const {success,data}=await res.json();
            if(success===false)
            {
                setError('error in uploading');
                setUpLoading(false);
                setFiles([]);
                return;
            }
            setListingData(prev=>({...prev,imageUrls:[...prev.imageUrls,...data]}));
            console.log(data);
            setUpLoading(false);
            setError(null);
            setFiles([]);
          }
          else 
          { 
            setError('You can upload  more than 6 Images')

          }
    }
    const handleDelete=(e)=>
    {
        const updatedUrls=listingData.imageUrls.filter((img,index)=>index!=e.target.id)
        setListingData({...listingData,imageUrls:updatedUrls});
        setError(null);
    }
    const handleFileChange = (e) => {
        setFormError(null);
        setError(null);
        const selectedFiles = Array.from(e.target.files); // Convert FileList to array
        const totalFiles = (listingData.imageUrls.length? listingData.imageUrls.length:files.length) + selectedFiles.length;
      
        // Check if the total exceeds 6
        if (totalFiles > 6) {
          setError('Cannot add more than 6 images.');
          e.target.value = ''; // Clear the input
          return;
        }
      
        // Update the state with the new files
        setFiles([...files, ...selectedFiles]);
        setError(null); // Clear any existing error
      };
      const handleFormSubmit=async(e)=>
      {  
        e.preventDefault();
        if(listingData.imageUrls.length===0)
        {
            setFormError('Images are Required To Upload');
            return;
        }
        if(listingData.regularPrice<listingData.discountPrice)
        {   setFormError('Discount Price Must be less than Regular price')
            return ;
        }
        try { setLoading(true);
            const res=await fetch('/api/listing/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(listingData)
            });
            const data=await res.json();
            if(data.success==false)
            {   console.log('in catch block')
                setLoading(false);
                setFormError(data.message);
                return;
            }
            setLoading(false);
            navigate(`/listing/${data._id}`)

        } catch (error) 
        {  setLoading(false);
            setFormError(error.message);
            
        }
      }
      const handleFocus=(e)=>
      {
        if(error|| formError)
        {
            setError(null);
            setFormError(null);
        }
      }
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleFormSubmit} onFocus={handleFocus}>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleFormChange}/>
            <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleFormChange}/>
            <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='62' minLength='10' required onChange={handleFormChange}/>
            <div className='flex  flex-wrap gap-10'>
            <div className='flex gap-2"'>
                <input type='checkbox' id='sale' className='w-5 mr-2'  onChange={handleFormChange}
       checked={listingData.type=='sale'?true:false}/>
                <span>Sell</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='rent' className='w-5 mr-2'  onChange={handleFormChange} checked={listingData.type=='rent'?true:false}/>
                <span>Rent</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='parking' className='w-5 mr-2' onChange={handleFormChange}/>
                <span>Parking spot</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='furnished' className='w-5 mr-2' onChange={handleFormChange}/>
                <span>Furnished</span>
            </div>
            <div className='flex gap-2"'>
                <input type='checkbox' id='offer' className='w-5 mr-2' onChange={handleFormChange}/>
                <span>Offer</span>
            </div>
        </div>
        <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='bedRooms'  min='1'  max='10' required className='p-2 border border-gray-300 rounded-lg ' onChange={handleFormChange}/>
                
                <span>Beds</span>
            </div>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='bathRooms'  min='1'  max='10' required className='p-2 border border-gray-300 rounded-lg ' onChange={handleFormChange}/>
                <span>Baths</span>
            </div>
            <div className='flex gap-2 items-center'>
                <input type='number'  id='regularPrice'  min='50'  max='10000000' required className='p-3 border w-28  border-gray-300 rounded-lg ' onChange={handleFormChange}/>
                <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {
                    listingData.type=='rent' && <span className='text-xs'>($/month)</span>
                }
                
                </div>
                
            </div>
            {
                listingData.type=='rent' && <div className='flex gap-2 items-center'>
                <input type='number'  id='discountPrice'  min='0'  max='100000' required className='p-2 border w-28 border-gray-300 rounded-lg ' onChange={handleFormChange}/>
                <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($/month)</span>
                </div>
            </div>
            }
            
        </div>
        </div>
       <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>Images:
        <span className='font-normal text-gray-700 ml-2'>The First Image will be cover(max 6)</span>
        </p>
        {
            error ? <span className='text-red-600 text-center'>{error}</span>:''
        }
        <div className='flex gap-4'>
             <label  className='p-3 border border-gray-300 rounded-lg w-full  flex justify-between cursor-pointer'    onClick={()=>{filRef.current.click()}}>
             <span className='border bg-white rounded-lg p-2' >Choose Files</span> 
             <span>{files.length} Files</span>
             </label>
            <input   className='p-3 border border-gray-300 rounded-lg w-full  '  max={6} ref={filRef}  onChange={handleFileChange} type='file' id='image' accept='image/*' multiple hidden  disabled={listingData.imageUrls.length>=6 ?true:false}/>
            <button  type='button'  disabled={uploading||files.length==0}  onClick={handleImageSubmit} className='p-3 text-green-500 rounded-lg border border-green-700 uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
        </div>
        {listingData.imageUrls.length>0 &&  
            
                listingData.imageUrls.map((img,index)=>
                    <div  key={index} className='flex  border  justify-between border-gray-500 p-3  items-centerrounded-lg'>
                <img src={img} className='w-20 h-20 object-contain rounded-lg' id={index}/>
                  <span className='text-red-400 cursor-pointer self-center' id={index} onClick={handleDelete}>DELETE</span>
                </div>)      
        }
        
        {
            uploading ? <span className='text-slate-600  text-center'>Uploading...</span>:''
        }
        <button  disabled={loading||uploading}  className='rounded-lg bg-slate-700 text-white uppercase p-3  hover:opacity-95 disabled:opacity-80'>{loading? 'Creating....':'Create Listing'}</button>
        {
            formError && <span className='text-red-400 text-center'>{formError}</span>
        }
       </div>
    </form>
   </main> 
   )
}
