/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "../UserContext/User.context";
import toast from "react-hot-toast";

export const Cartcontext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(userContext);
  const [cartInfo, setCartInfo] = useState(null);
  // add products
  async function addCartProducts({ productId }) {
    const toastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        data: {
          productId,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        getCartProducts();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // get products
  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // delet item from cart
  async function handleDeletProductFromCart({ productId }) {
    const toastId = toast.loading("Deleting Item Under Processing...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // clear all products from cart
  async function handleClearAllProductsFromCart() {
    const toastId = toast.loading("Delet All Products Under Processing")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      if(data.message === "success"){
        setCartInfo({numOfCartItems:0})
        toast.success("Your Cart Now Is Clear")
      }
    } catch (error) {
        toast.error(error.response.data.message)
    }finally{
        toast.dismiss(toastId)
    }
  }

  // update count of product in cart

  async function updateProductCountInCart({productId,count}){
    try{
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method:"PUT",
            headers:{
                token
            },
            data:{
                count
            }
        }
        const {data} =  await axios.request(options)
        if(data.status === "success"){
            setCartInfo(data)
        }
    }catch(error){
    }
  }

  return (
    <Cartcontext.Provider
      value={{
        addCartProducts,
        getCartProducts,
        cartInfo,
        handleDeletProductFromCart,
        handleClearAllProductsFromCart,
        updateProductCountInCart,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
