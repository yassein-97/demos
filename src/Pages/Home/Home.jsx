/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { userContext } from "../../Components/Context/UserContext/User.context";
import {Helmet} from "react-helmet";
import { useQuery } from "@tanstack/react-query";



export default function Home() {

  function getProductsFromServer() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
   return  axios.request(options);
  }




  const {data,isLoading ,isError} = useQuery({
    queryKey:["products"],
    queryFn:getProductsFromServer,
    refetchOnMount:false,
    staleTime: 60 * 60 * 1000
  })


 
if (isLoading) {
  return <Loading/>
}
  
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>My Home</title>
    <meta name="description" content="store for clothes"/>

    </Helmet>

      <HomeSlider />
      <CategorySlider />

        <div className="grid grid-cols-12 gap-4">
          {data.data.data.map((product) => (
            <ProductCard key={product.id} productInfo={product} />
          ))}
        </div>
      
    </>
  );
}
