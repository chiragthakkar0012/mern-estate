import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FaShare} from 'react-icons/fa';
export default function ImageHandler({listingData,copied,setCopied}) {
  return (<>
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
   </>
  )
}
