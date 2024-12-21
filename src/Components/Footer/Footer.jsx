/* eslint-disable no-unused-vars */
import React from 'react'
import amazon from "../../assets/images/amazon-pay.png"
import american from "../../assets/images/American-Express-Color.png"
import master from "../../assets/images/mastercard.webp"
import paypal from "../../assets/images/paypal.png"
import apple from "../../assets/images/get-apple-store.png"
import google from "../../assets/images/get-google-play.png"



export default function Footer() {
  return (
   <>
   <footer className="py-11 bg-slate-100">
    <div className="container space-y-4">
 <h2 className="text-slate-700 font-bold text-xl">Get the Fresh Cart App</h2>
 <p className='text-slate-400'>We will send you alink , open it on your phone to download the app</p>
 <div className="share-link flex gap-2">
  <input  className="flex-grow form-control border-gray-400 p-2 caret-black rounded-md " type="email" name="email" placeholder='Email...'/>
  <button className='btn bg-slate-500 hover:bg-slate-900'> Share App Link</button>
 </div>
 <div className="box-container flex justify-between items-center border-y-2 py-4 border-slate-200">
<div className="box flex gap-3 items-center">
  <h2>Payment Partner</h2>
<img className='w-20' src={amazon} alt="" />
<img className='w-20' src={american} alt="" />
<img className='w-20' src={master} alt="" />
<img className='w-20' src={paypal} alt="" />
</div>

<div className="box flex gap-3 items-center">
<h2>Get Deliveries  With Fresh Cart</h2>
<img className='w-24' src={apple} alt="" />
<img className='w-[110px]' src={google} alt="" />
</div>

 </div>
    </div>
   </footer>
   </>
  )
}
