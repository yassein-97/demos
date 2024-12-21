/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"

export default function Subcategories() {
    const [subcategory , setSubcategory] = useState(null)
    const {id,catname} = useParams()
    
async function getSubcategoryFromServer(){
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
        method:"GET"
    }
  const {data} = await axios.request(options)
  setSubcategory(data.data)







}


useEffect(()=>{
    getSubcategoryFromServer()
},[id])





  return (
 <>
{!subcategory ? <Loading/> :<>
    <h1 className="text-center text-3xl font-bold text-gray-600 mb-4 capitalize">{catname} SubCategories</h1>
 <div className="grid grid-cols-12 gap-4">
   {subcategory.map(sub=>
    <div key={sub._id} className="col-span-12 sm:col-span-6 md:col-span-4 border-2 rounded-md">
    <p className="capitalize font-bold text-center py-3 text-3xl">{sub.name}</p>
    </div>
   )}
 </div>



</>}
 </>
  )
}
