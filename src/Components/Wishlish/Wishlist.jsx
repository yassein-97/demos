/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react"
import { userContext } from "../Context/UserContext/User.context"
import { useDispatch, useSelector } from "react-redux"
import { getWishListProducts } from "../../Features/wishlistSlice"
import WishlistCard from "../WishlistCard/WishlistCard"
import Loading from "../Loading/Loading"

export default function Wishlist() {
  const {token} = useContext(userContext)
  const dispatch = useDispatch()

    const{data,error,isLoading,isError} = useSelector(function(store){
      return store.whishlistReducer
    })

useEffect(()=>{
  dispatch(  getWishListProducts({token}))

},[])

console.log(data)
  return (
    <>
    <h1 className="text-3xl font-bold text-gray-500 capitalize mb-4">Hello from wish-list products</h1>
    {data && data.map(product=><WishlistCard key={product._id} productInfo={product}/>)}
    </>
  )
}
