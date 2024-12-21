/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';





export default function HomeSlider() {
  return (
   <>




   <div className="slider-box grid grid-cols-12 mb-4">

   
    <div className="slider-active col-span-12 md:col-span-8">
    <swiper-container style={{height:"100%"}} loop={true}  navigation="true" pagination="true" autoplay>
        <SwiperSlide style={{height:"100%"}} >
        <img className="w-full h-full object-cover" src={slider1} alt="" />
        </SwiperSlide>
        <Swiper-slide  style={{height:"100%"}}>
        <img className="w-full h-full object-cover" src={slider2} alt="" />
        </Swiper-slide>
        <SwiperSlide style={{height:"100%"}} >
        <img className="w-full h-full object-cover" src={slider3} alt="" />
        </SwiperSlide>
        </swiper-container>
    </div>
    <div className="slider-items col-span-12 md:col-span-4">
        <div className="h-1/2">
            <img className="h-full" src={slider2} alt="" />
        </div>
        <div className="h-1/2">
            <img className="h-full" src={slider3} alt="" />
        </div>
    </div>
   
   </div>
   
   </>
  )
}


