import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loading from "../Loading/Loading"
import ProductCard from "../ProductCard/ProductCard"
import { Helmet } from "react-helmet"

export default function Products() {
 const [showProducts , setShowProducts] = useState(null)


async function getAllProductsFromServer(){
   const toastId =  toast.loading("Waiting.....")
  try {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/products",
        method:"GET"
    }

const{data} = await axios.request(options)
setShowProducts(data.data)
  } catch (error) {
    toast.error(error.response.data.message)
  }finally{
 toast.dismiss(toastId)
  }



}





useEffect(()=>{
    getAllProductsFromServer()
},[])


  return (
    <>

<Helmet>
<meta charSet="utf-8" />
<title>Products</title>
<meta name="description" content="products of store"/>

</Helmet>




    {!showProducts ? <Loading/>:<>
    <div className="grid grid-cols-12 gap-5">
{showProducts.map(product=> <ProductCard key={product._id} productInfo={product}/>)}
    </div>
    </>}
    </>
  )
}
