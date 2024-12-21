import offline from "../../assets/images/Offline (1).jpg"
export default function Offline() {
  return (
   <>
  <div className="flex justify-center items-center">
  <div className="flex flex-col gap-4 justify-center items-center">
    <h2 className="text-gray-600"> Please Check Your Connection
    <i className="fa-solid fa-wifi ml-4"></i>
         </h2>
    <img className="w-1/2" src={offline} alt="" />
   </div>
  </div>
   </>
  )
}
