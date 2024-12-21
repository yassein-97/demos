/* eslint-disable react/prop-types */
import useOnline from "../../Hooks/useOnline"
 import Offline from "../Offline/Offline"
export default function Online({children}) {
    const isOnline = useOnline()
 
    if (isOnline) {
      return children  
    }else{
      return   <Offline/>
    }
}
