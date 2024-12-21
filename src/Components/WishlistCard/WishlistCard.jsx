/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Cartcontext } from "../Context/CartContext/Cart.context";
import { useDispatch } from "react-redux";
import { userContext } from "../Context/UserContext/User.context";
import { removeProductFromWishlist } from "../../Features/wishlistSlice";

export default function WishlistCard({ productInfo }) {
  const { token } = useContext(userContext);
  const { addCartProducts } = useContext(Cartcontext);
  const dispatch = useDispatch();

  return (
    <>
      <div className="parent flex justify-between items-center bg-red-200 p-5 mb-5">
        <div className="child">
          <div className="subchild flex gap-5 items-center">
            <img className="w-[150px]" src={productInfo.imageCover} alt="" />
            <div className="box flex flex-col gap-3">
              <h2 className="capitalize text-lg font-bold">
                {productInfo.title}
              </h2>
              <span className="text-gray-500">{productInfo.price} EGP</span>
              <span
                onClick={() => {
                  dispatch(
                    removeProductFromWishlist({
                      productId: productInfo._id,
                      token,
                    })
                  );
                }}
                className="cursor-pointer text-red-600"
              >
                <i className="fa-solid fa-trash mr-1"></i>
                Remove
              </span>
            </div>
          </div>
        </div>

        <div className="child">
          <button
            onClick={() => {
              addCartProducts({ productId: productInfo.id });
            }}
            className="btn"
          >
            {" "}
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
