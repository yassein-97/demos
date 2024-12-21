/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Sinup() {
  const Navigate = useNavigate()
const [errorMessage,setErrorMessage] = useState(null)

 async function handleSubmitForm(values){
  const toastId = toast.loading('Loading...')
try {
  const options = {
    url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
    method:"POST",
    data:values
  }

const {data} = await axios.request(options)
if(data.message === "success"){
  toast.success('Successfully created!')
  setTimeout(()=>{
   Navigate("/login")
  },1000)
}
  
} catch (error) {
  toast.error(error.response.data.message)
  setErrorMessage(error.response.data.message)
}finally{
  toast.dismiss(toastId)
}



}











const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

const validate = object({
  name:string().required("You Must Enter Your Name").min(3 ,"Your Name must not less than 3 character").max(24 , "Your Name must not more than 24 character"),
  email:string().required("You Must Enter Your Email").email("Your Email Not Valid"),
  password:string().required("Your Password Is Required").matches(passwordRegex,"Minimum 8 characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
  rePassword:string().required("Confirm Password Is Required").oneOf([ref("password")],"Confirm Password Must be Identical With Password"),
  phone:string().required("Your Phone Is Required").matches(/^(002)?01[0125][0-9]{8}$/,"Only Egyptian Number Accepted")
})





  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit:handleSubmitForm,
    validationSchema:validate,
  });





  return (
    <>
    <Helmet>
      <title> sign Up Page</title>
    </Helmet>
      <h2 className="mb-4 font-bold text-slate-700"> <i className="fa-solid fa-user mr-3"></i>Register Now
      </h2>


      <form className="space-y-5" onSubmit={formik.handleSubmit}>

        <div>
          <input
            className="form-control w-full"
            type="text"
            name="name"
            value={formik.values.name}
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && <p className="text-red-600 text-sm">*{formik.errors.name}</p>}
        </div>


        <div>
          <input
            className="form-control w-full"
            type="email"
            name="email"
            value={formik.values.email}
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && <p className="text-red-600 text-sm">*{formik.errors.email} </p>}
          {errorMessage && <p className="text-red-600 text-sm">*{errorMessage} </p>}
        </div>


        <div>
          <input
            className="form-control w-full"
            type="password"
            name="password"
            value={formik.values.password}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && <p className="text-red-600 text-sm">*{formik.errors.password} </p>}

        </div>


        <div>
          <input
            className="form-control w-full"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            placeholder="Re-Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />

{formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-600 text-sm">*{formik.errors.rePassword} </p>}

        </div>


        <div>
          <input
            className="form-control w-full"
            type="tel"
            name="phone"
            value={formik.values.phone}
            placeholder="Phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && <p className="text-red-600 text-sm">*{formik.errors.phone} </p>}

        </div>
        

        <button className="btn w-full" type="submit"> Send</button>

      </form>
    </>
  );
}
