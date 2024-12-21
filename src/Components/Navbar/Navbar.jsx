/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../Context/UserContext/User.context";
import { Cartcontext } from "../Context/CartContext/Cart.context";
export default function Navbar() {
  const { token, setToken, logOut } = useContext(userContext);

  const { cartInfo, getCartProducts } = useContext(Cartcontext);
  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 py-3 shadow-md fixed w-full top-0 left-0 z-50">
        <div className="container flex items-center">
          <div className="logo  mr-8">
            <Link to="/">
              <img src={logo} alt="logo of website" />
            </Link>
          </div>
          {token && (
            <ul className="flex items-center gap-4">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-1 before:w-0 before:bg-red-600 before:transition-[width] before:duration-300 hover:before:w-full before:left-0 before:-bottom-2 ${
                      isActive ? "before:w-full font-bold" : ""
                    }}`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-1 before:w-0 before:bg-red-600 before:transition-[width] before:duration-300 hover:before:w-full before:left-0 before:-bottom-2 ${
                      isActive ? "before:w-full font-bold" : ""
                    }}`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-1 before:w-0 before:bg-red-600 before:transition-[width] before:duration-300 hover:before:w-full before:left-0 before:-bottom-2 ${
                      isActive ? "before:w-full font-bold" : ""
                    }}`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-1 before:w-0 before:bg-red-600 before:transition-[width] before:duration-300 hover:before:w-full before:left-0 before:-bottom-2 ${
                      isActive ? "before:w-full font-bold" : ""
                    }}`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>


              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-1 before:w-0 before:bg-red-600 before:transition-[width] before:duration-300 hover:before:w-full before:left-0 before:-bottom-2 ${
                      isActive ? "before:w-full font-bold" : ""
                    }}`;
                  }}
                  to="/wishlist"
                >
                  Wish list
                </NavLink>
              </li>








              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:h-1 before:w-0 before:bg-red-600 before:transition-[width] before:duration-300 hover:before:w-full before:left-0 before:-bottom-2 ${
                      isActive ? "before:w-full font-bold" : ""
                    }}`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          )}

      {token &&     <Link to="/cart" className="cart-car ms-auto mr-6 relative">
            <i className="fa-solid fa-cart-shopping text-3xl"></i>
            <div className="cart-counter absolute bg-primary-500 text-white top-0 right-0 translate-x-[50%] -translate-y-[50%] rounded-full size-6 flex justify-center items-center">
              {cartInfo === null ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <span>{cartInfo.numOfCartItems}</span>
              )}
            </div>
          </Link>}
          <ul className="flex items-center gap-4 mr-4 ms-auto">
            <li>
              <a href="https://www.facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://www.x.com" target="_blank">
                <i className="fa-brands fa-x"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
          <div className="btn-box flex gap-1 flex-wrap">
            {!token && (
              <>
                <Link to="/login">
                  <button className="btn  text-sm">Login</button>
                </Link>

                <Link to="/sinup">
                  <button className="btn  text-sm">Sign Up</button>
                </Link>
              </>
            )}

            {token && (
              <button
                onClick={logOut}
                className="btn bg-blue-400 hover:bg-blue-950 text-sm"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
