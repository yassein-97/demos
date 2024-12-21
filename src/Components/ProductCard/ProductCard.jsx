/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../Context/CartContext/Cart.context";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addwhishlistData } from "../../Features/wishlistSlice";
import { userContext } from "../Context/UserContext/User.context";

export default function ProductCard({ productInfo }) {
  const{token} = useContext(userContext)

const [color,setColor] = useState("none")

  const { addCartProducts } = useContext(Cartcontext);

   const dispatch = useDispatch()

   const{whishListdata,error,isLoading,isError} = useSelector(function(store){
  return store.whishlistReducer
   })


  return (
    <>
      <div
        className="product-card col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 rounded-md overflow-hidden shadow-lg"
      >
        <div className="img relative mb-4 overflow-hidden group/parent ">
          <img className="w-full" src={productInfo.imageCover} alt="" />
          <div className="over-lay absolute left-0 w-full h-full bg-red-700/20 flex justify-center items-center text-white text-xl -top-[800px] group-hover/parent:top-0 transition-all duration-300 gap-4">
            <div onClick={()=>{dispatch(addwhishlistData({productId:productInfo._id,token}))}} className="size-10 rounded-full flex justify-center items-center bg-red-600">
              <i onClick={()=>{ setColor("text-yellow-600")}} className={`fa-solid fa-heart cursor-pointer ${color} hover:rotate-6 transition-transform duration-300 hover:scale-105 cursor-pointer`}></i>
            </div>

            <div className="size-10 rounded-full flex justify-center items-center bg-red-600">
              <i
                onClick={() => {
                  addCartProducts({ productId: productInfo._id });
                }}
                className="fa-solid fa-cart-shopping cursor-pointer hover:rotate-6 transition-transform duration-300 hover:scale-105"
              ></i>
            </div>

            <Link
              to={`/productDetails/${productInfo._id}`}
              className="size-10 rounded-full flex justify-center items-center bg-red-600"
            >
              <i className="fa-solid fa-eye cursor-pointer hover:rotate-6 transition-transform duration-300 hover:scale-105"></i>
            </Link>
          </div>
        </div>
        <div className="card-text p-3 space-y-3">
          <h2 className="text-center text-slate-600">
            {productInfo.category.name}
          </h2>
          <h2 className="text-center text-primary-600 line-clamp-2">
            {productInfo.title}
          </h2>
          <p className="line-clamp-2">{productInfo.description}</p>
          <div className="product-info flex justify-between">
            <p>{productInfo.price} L.E</p>
            <div>
              <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
              <span>{productInfo.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
