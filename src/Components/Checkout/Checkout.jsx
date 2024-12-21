/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { object, string } from "yup";
import { userContext } from "../Context/UserContext/User.context";
import axios from "axios";
import { Cartcontext } from "../Context/CartContext/Cart.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
 
export default function Checkout() {
const {token} = useContext(userContext)
 const {cartInfo} = useContext(Cartcontext)
 const navigate = useNavigate()
const[paymentMethod,setPaymentMethod] = useState("cash")

// const validate = object({
//     shippingAddress:object({
//         details:string().required("Details is Required").min( 5,"Character Not less than 5 letters"),
//         phone:string().required("Phone is Required"),
//         city:string().required("City is Required").min(3,"Not less than 3 lwtters")
//     }) 
   
// })



  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    // validationSchema: validate,
    onSubmit:(values)=>{
        if (paymentMethod === "cash") {
                    handleCashOrder(values)

        }else if(paymentMethod === "online"){
            handleOnlineOrder(values)

      
    }}
  })




async function handleCashOrder(values){
try {
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method:"POST",
        headers:{
            token
        },
        data:{
            values
        }
    
    
    }
    
    const {data} = await axios.request(options)
    if (data.status === "success") {
        navigate("/allorders")
    }
} catch (error) {
}

}


async function handleOnlineOrder(values){
    try {
        
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${window.location.origin}`,
            method:"POST",
            headers:{
                token
            },
            data:{
                values
            }
        }

const {data} = await axios.request(options)
if (data.status === "success") {
   setTimeout(()=>{
    window.location.assign(data.session.url)
   },2000)
}
    } catch (error) {

    }
}


  return (



    <>

<Helmet>
  <title> Check Out Page</title>
</Helmet>



      <h1 className="mb-4 text-3xl text-gray-600 font-bold">Payment Process</h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <input
            placeholder="Your City"
            className="form-control w-full"
            name="shippingAddress.city"
            type="text"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>

     {/* {formik.errors.shippingAddress.city && formik.touched.shippingAddress.city &
          <p className="text-red-800 text-sm font-bold">{formik.errors.shippingAddress?.city}</p>}  */}

        </div>

        <div>
          <input
            placeholder="Phone Number"
            className="form-control w-full"
            type="tel"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <textarea
            placeholder="Location Details"
            className="form-control w-full"
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="flex justify-between">
        <div>
        <button
            className="btn bg-yellow-300 hover:bg-yellow-700 transition-colors duration-300 text-black mr-4"
            type="submit"
            onClick={()=>{
                setPaymentMethod("cash")
               
            }}
          >
            Cash Payment
          </button>

          <button
            className="btn bg-primary-300 hover:bg-primary-700 transition-colors duration-300 text-black"
            type="submit"
            onClick={()=>{
                setPaymentMethod("online")
                
            }}
          >
          Online Payment
          </button>



        </div>
          <button className="btn" type="reset">
            {" "}
            Clear Form
          </button>
        </div>
      </form>
    </>
  );
}
