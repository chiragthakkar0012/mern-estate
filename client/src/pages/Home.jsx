import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ListingCart from '../components/ListingCart';
export default function Home() {
  const [offerListings,setofferListings]=useState([]);
  const [rentListings,setrentListings]=useState([]);
  const [saleListings,setsaleListings]=useState([]);
    useEffect(()=>
    { 
    const fetchOfferListings=async()=>
      {
        try {
          const res=await fetch(`/api/listing/get?offer=true&limit=4`);
          const data=await res.json();
          setofferListings(data);
          fetchRentListings();
        } catch (error) {
          console.log(error);
        }
      }
    const fetchRentListings=async()=>
        {
          try {
            const res=await fetch(`/api/listing/get?type=rent&limit=4`);
            const data=await res.json();
            setrentListings(data);
            fetchSaleListings()
          } catch (error) {
            console.log(error);
          }
        }
    const fetchSaleListings=async()=>
          {
            try {
              const res=await fetch(`/api/listing/get?type=sale&limit=4`);
              const data=await res.json();
              setsaleListings(data);
            } catch (error) {
              console.log(error);
            }
          }
     fetchOfferListings() 
    },[])
    console.log(saleListings);
  return (
    <div>
      {/* top side */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next
          <span className='text-slate-500'> Perfect</span>
          <br/>
          place with ease 
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to live 
          <br/>
          We have wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Let's get started ...</Link>
      </div>
      {/* {image slider} */}

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
              className="mySwiper">
        {
          offerListings && offerListings.length>0 && 
          offerListings.map((listing)=>(
           <SwiperSlide key={listing._id}>
                     <div className='h-[500px]' style={{background:`url(${listing.imageUrls[0]}) center center / contain no-repeat`,backgroundSize:'cover' }}>
                     </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {/* {listing results for offer ,sale and rent} */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-6 my-10'>
        {
          offerListings && offerListings.length>0 && (
            <div>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                  <Link to={'/search?offer=true'} className='text-sm hover:underline text-blue-800'>Show More Offers</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offerListings.map((listing)=>(<ListingCart listing={listing} key={listing._id}/>))
                  }
                </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length>0 && (
            <div>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Rent</h2>
                  <Link to={'/search?type=rent'} className='text-sm hover:underline text-blue-800'>Show More Places For Rent</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rentListings.map((listing)=>(<ListingCart listing={listing} key={listing._id}/>))
                  }
                </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length>0 && (
            <div>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Sale</h2>
                  <Link to={'/search?offer=true'} className='text-sm hover:underline text-blue-800'>Show More Place For Sale</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    saleListings.map((listing)=>(<ListingCart listing={listing} key={listing._id}/>))
                  }
                </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
