/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Cartcontext } from "../Context/CartContext/Cart.context";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function CartItems({ productInfo }) {
  const { handleDeletProductFromCart, updateProductCountInCart } =
    useContext(Cartcontext);
  const { product, count } = productInfo;
  const { id } = product;
  return (
    <>

<Helmet>
  <title> Cart Products</title>
</Helmet>



      <div className="flex gap-5">
        <div className="flex justify-between items-center bg-gray-300 flex-grow">
          <div className="img overflow-hidden">
            <img
              className="size-24 object-cover rounded-full"
              src={productInfo.product.imageCover}
              alt=""
            />
          </div>

          <Link to={`/ProductDetails/${id}`}>
            <h2>{productInfo.product.title}</h2>
          </Link>
          <h2>{productInfo.product.category.name}</h2>
          <div className="count-box flex justify-center gap-6 items-center pe-5">
            <span className="w-20 h-10 bg-yellow-400 flex justify-center items-center">
              {productInfo.count}
            </span>
            <div className="flex flex-col gap-2 pe-4">
              <span
                onClick={() => {
                  updateProductCountInCart({ productId: id, count: count + 1 });
                }}
                className=" size-10 bg-red-600 rounded-full flex justify-center items-center"
              >
                <i className="fa-solid fa-plus cursor-pointer text-2xl"></i>
              </span>
              <span
                onClick={() => {
                  updateProductCountInCart({ productId: id, count: count - 1 });
                }}
                className=" size-10 bg-red-600 rounded-full flex justify-center items-center"
              >
                <i className="fa-solid fa-minus cursor-pointer text-2xl "></i>
              </span>
            </div>
            <span> {productInfo.price}LE</span>
          </div>
        </div>
        <button
          onClick={() => {
            handleDeletProductFromCart({ productId: id });
          }}
          className="bg-red-600 px-4"
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    </>
  );
}
