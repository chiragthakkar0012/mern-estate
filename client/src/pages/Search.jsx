import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Search() {
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState([]);
    const [sideBarData,setsideBarData]=useState({
        searchTerm:'',
        type:'all',
        offer:false,
        parking:false,
        furnished:false,
        order:'desc',
        sort:'createdAt'
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale')
        {
            setsideBarData({...sideBarData,type:e.target.id})
        }
        if(e.target.id==='parking'||e.target.id==='furnished' || e.target.id==='offer' )
        {
            setsideBarData({...sideBarData,[e.target.id]:!sideBarData[e.target.id]});
        }
        if(e.target.id==='searchTerm')
        {
            setsideBarData({...sideBarData,searchTerm:e.target.value});
        }
        if(e.target.id==='sort_order')
        {
            setsideBarData({...sideBarData,sort:e.target.value.split('_')[0],order:e.target.value.split('_')[1]})
        }
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const urlParams=new URLSearchParams();
        urlParams.set('searchTerm',sideBarData.searchTerm)
        urlParams.set('type',sideBarData.type)
        urlParams.set('offer',sideBarData.offer)
        urlParams.set('parking',sideBarData.parking)
        urlParams.set('furnished',sideBarData.furnished)
        urlParams.set('order',sideBarData.order);
        urlParams.set('sort',sideBarData.sort);
        const searchQuery=urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    useEffect(()=>
    {
        const urlParams=new URLSearchParams(location.search);
        const searchTermFromUrl=urlParams.get('searchTerm');
        const typeFromUrl=urlParams.get('type');
        const offerFromUrl=urlParams.get('offer');
        const parkingFromUrl=urlParams.get('parking');
        const furnishedFromUrl=urlParams.get('furnished');
        const sortFromUrl=urlParams.get('sort');
        const orderFromUrl=urlParams.get('order');
        
        if(searchTermFromUrl || typeFromUrl || offerFromUrl || parkingFromUrl ||furnishedFromUrl || sortFromUrl || orderFromUrl)
        {
            setsideBarData({
                searchTerm:searchTermFromUrl || '',
                type:typeFromUrl || 'all',
                offer:offerFromUrl==true? true:false,
                parking:parkingFromUrl===true? true:false,
                furnished:furnishedFromUrl===true? true:false,
                order:orderFromUrl||'desc',
                sort:sortFromUrl || 'createdAt'
            })
        }


        const fetchedListing=async()=>
        {
            setLoading(true);
            const searchQuery=urlParams.toString();
            const res=await fetch(`/api/listing/get?${searchQuery}`);
            const data=await res.json();
            setLoading(false);
            setListings(data);

        }
        fetchedListing()
    },[location.search]);
console.log(listings);
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='flex items-center gpa-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input type='text' id='searchTerm' placeholder='Search' className='border rounded-lg p-3 w-full' value={sideBarData.searchTerm} onChange={handleChange}/>
            </div>
            <div className='flex gap-2 items-center flex-wrap'>
                <label className='font-semibold'>Type :</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sideBarData.type==='all'}/>
                    <span>Rent & Sales</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'
                        onChange={handleChange} checked={sideBarData.type==='rent'}
                    />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5'
                        onChange={handleChange} checked={sideBarData.type==='sale'}
                    />
                    <span>Sales</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'
                        onChange={handleChange} checked={sideBarData.offer}
                    />
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-2 items-center flex-wrap'>
                <label className='font-semibold'>Amenities:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'
                        onChange={handleChange} checked={sideBarData.parking}
                    />
                    <span>Parking</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'
                        onChange={handleChange} checked={sideBarData.furnished}
                    />
                    <span>Furnished</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort : </label>
                <select  onChange={handleChange}  defaultValue='createdAt_desc' name='sort' id='sort_order' className=' border rounded-lg p-3' defaultValue='Select'>
                    <option value='regularPrice_desc'>Price High to Low</option>
                    <option value='regularPrice_asc'>Price Low to High</option>
                    <option value='createdAt_asc'>Oldest</option>
                    <option value='createdAt_desc'> Lastest</option>
                </select>
            </div>
            <button className='bg-slate-700 rounded-lg text-white text-center uppercase p-3 hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3  text-slate-700 mt-5'>Listing Results:</h1>
        </div> 
    </div>
  )
}
