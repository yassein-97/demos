import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading"
import BrandCard from "../BrandCard/BrandCard"
import BrandDialog from "../BrandDialog/BrandDialog"

export default function Brands() {
    const[brands , setBrands] = useState(null)
    const[openDialoge,setOpenDialoge] = useState(false)


async function getBrandsFromServer(){
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/brands",
        method:"GET"
    }
    const{data} = await axios.request(options)
    setBrands(data.data)
}

useEffect(()=>{
    getBrandsFromServer()
},[])



function handleDialogShow(){
    setOpenDialoge(!openDialoge)
}




  return (
    <>
    <h1 className="capitalize text-gray-500 text-lg mb-6"> our brands</h1>
    {! brands ? <Loading/> : <div className="grid grid-cols-12 gap-5">
        {brands.map(brand=> <BrandCard key={brand._id} brandInfo={brand} handleDialogShow={handleDialogShow}/>)}
        </div>}
{openDialoge &&  <BrandDialog handleDialogShow={handleDialogShow}/>      
}
    </>
  )
}
