import Loading from "../Loading/Loading";

/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
export default function OrderCard({ orderInfo }) {
  return (

   

    <>
 <Helmet>
    <meta charSet="utf-8" />
    <title>My Order</title>
    </Helmet>


      <section>
        <div className="order border-2 border-gray-600 p-2 shadow-md py-4 rounded-md">
          <div className="flex justify-between">
            <div className="flex flex-col mb-4">
              <span className="text-gray-500 capitalize">order id :</span>
              <span className="font-bold">#{orderInfo.id}</span>
            </div>
            <div>
              {orderInfo.isPaid ?   <span className="font-bold mr-4 bg-black text-white px-3 py-1 rounded-md">
                  Paid
                </span>  :  <span className="font-bold mr-4 bg-black text-white px-3 py-1 rounded-md">
                   Not Paid
                </span>
              
              }

              {!orderInfo.isDelivered && (
                <span className="font-bold bg-yellow-700 text-white rounded-md px-3 py-1">
                  Delivery Under Processing
                </span>
              )}
            </div>
          </div>

         { ! orderInfo ? <Loading/> : <>
            <div className="grid grid-cols-12 gap-4">
         {orderInfo.cartItems.map(item=>
            <div key={item._id} className="col-span-12 md:col-span-3 lg:col-span-2 border-2 shadow-md">
              <div className="img">
                <img
                  className="w-full"
                  src={item.product.imageCover}
                  alt=""
                />
              </div>
              <div className="px-4 mt-3 pb-4">
                <p className="font-bold capitalize text-gray-700">
                  {item.product.title}
                </p>
               <div className="flex justify-between mt-3 items-center">
               <span>{item.price} LE</span>
               <span className="text-gray-600">  {item.count} Piece</span>
               </div>
               <p className="mt-4 text-sm text-primary-500"> Total Price Is  {item.price * item.count} </p>
              </div>
            </div>

           
         


         
         
         )}
         
         </div>
         </>}

          
          <p className="mt-6 text-lg font-semibold text-primary-500">
            Total Order Price is : <span className="text-black"> {orderInfo.totalOrderPrice} L E</span>
          </p>
        </div>
      </section>
    </>
  );
}
