import { useEffect, useState } from "react";
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
    const [showCategories , setShowCategories] = useState(null)

async function getAllCategoriesFromServer(){
    const toastId = toast.loading("Waiting....")
  try {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/categories",
        method:"GET"
    }
    const{data} = await axios.request(options)
    setShowCategories(data.data)
  } catch (error) {
    toast.error(error.response.data.message)
  }finally{
    toast.dismiss(toastId)
  }




}

useEffect(()=>{
    getAllCategoriesFromServer()
},[])



  return (
   <>


<Helmet>
<meta charSet="utf-8" />
<title>Product Category</title>
<meta name="description" content="products Category"/>

</Helmet>






   <h1 className="text-gray-600 font-bold">Hello from Categories</h1>
 {! showCategories ? <Loading/>:<>
    <div className="grid grid-cols-12 mt-4 gap-5">
        {showCategories.map(cat=> <CategoriesCard key={cat._id} catInfo={cat}/>)}
    </div>
 </>}
 <div className="mt-9">
    <Outlet/>
 </div>
   </>
  )
}



