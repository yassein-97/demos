/* eslint-disable react/prop-types */

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function BrandCard({brandInfo,handleDialogShow}) {
  return (
 <>
   <Helmet>
    <title> Brands</title>
    </Helmet>
    <Link onClick={()=>{handleDialogShow()}} to={`/brands/branddialog/${brandInfo._id}`} className="col-span-12 sm:col-span-4 lg:col-span-3 border-2 rounded-md hover:shadow-md transition-shadow duration-300">
   <div className="img">
     <img className="w-full" src={brandInfo.image} alt="" />
   </div>
   <h1 className="text-center font-bold text-gray-600 py-4">{brandInfo.name}</h1>
    </Link>
    
 </>
  )
}
