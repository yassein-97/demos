/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { userContext } from "../Context/UserContext/User.context"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import OrderCard from "../OrderCard/OrderCard"
import Loading from "../Loading/Loading"


export default function Allorders() {

const {token} = useContext(userContext)
const {id} = jwtDecode(token)
const [orders , setOrders] = useState(null)


async function getAllOrdersForUser(){
  const options = {
    url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    method:"GET",
  }

  const {data} = await axios.request(options)
  setOrders(data)
}


useEffect(()=>{
  getAllOrdersForUser()
},[])


  return (
    <>
   <div className="space-y-4">
    {! orders ? <Loading/> : orders.map(order=> <OrderCard key={order.id} orderInfo={order}/>) }
   </div>
    </>
  )
}
