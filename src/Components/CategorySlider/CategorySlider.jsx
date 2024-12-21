/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  const {data , isLoading , isError} = useQuery({
    queryKey:["categories"],
    queryFn:getCategoryFromServer,
    refetchOnMount:false,
    staleTime: 60 * 60 * 1000
  })

  function getCategoryFromServer() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    
   return   axios.request(options);
  }




if (isLoading) {
  return <Loading/>
}


  return (
    <>
      <div className="mb-12">
        <h2 className="mb-4">Shop Popular Categories :</h2>
        
       
          <swiper-container
            slides-per-view="6"
            navigation="true"
            pagination="true"
            autoplay
            loop={true}
          >
            {data.data.data.map((category) => (
              <SwiperSlide key={category._id}>
                <Link to={`category/${category._id}`}>
                  <img
                    className="h-60 object-cover"
                    src={category.image}
                    alt={category.slug}
                  />
                  <h3 className="text-center">{category.name}</h3>
                </Link>
              </SwiperSlide>
            ))}
          </swiper-container>
      
      </div>
    </>
  );
}
