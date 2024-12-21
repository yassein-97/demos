/* eslint-disable react/prop-types */

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { userContext } from "../Context/UserContext/User.context"

export default function GouseRoute({children}) {
  const {token} = useContext(userContext)

  if (!token) {
    return children
  }else{
    return <Navigate to="/"/>
  }
}
