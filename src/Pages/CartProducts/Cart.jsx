/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import { Cartcontext } from "../../Components/Context/CartContext/Cart.context";
import Loading from "../../Components/Loading/Loading";
import CartItems from "../../Components/CartItems/CartItems";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCartProducts, cartInfo ,handleClearAllProductsFromCart } = useContext(Cartcontext);
  
  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-4">
          <i className="fa-brands fa-opencart text-3xl"></i>
          <h2 className="text-3xl font-bold relative before:w-[5px] before:h-full before:absolute before:bg-red-800 before:-left-[10px] before:bottom-0">
            Cart Products
          </h2>
        </div>
        {cartInfo === null ? (
          <Loading />
        ) : (
          <section>
            {cartInfo.numOfCartItems === 0 ? (
              <div className="bg-gray-400 shadow-md p-3 flex flex-col justify-center items-center gap-5">
                <p>oops Your cart is empty back to </p>
                <Link className="bg-red-700 px-6 py-2" to="/">
                  {" "}
                  Home
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartInfo.data.products.map((product) => (
                    <CartItems key={product._id} productInfo={product} />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="bg-primary-400 px-3 py-1">
                    Total price is ${cartInfo.data.totalCartPrice}
                  </p>
                  <button onClick={handleClearAllProductsFromCart} className="btn"> Delet All Products</button>
                </div>
                <div className="mt-8">
                <Link to="/checkout" className="btn w-full bg-black text-white inline-block text-center"> Continuous For Payment</Link>
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </>
  );
}
