/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// add products to wishlist
export const addwhishlistData = createAsyncThunk(
  "whishlist/addwhishlistData",
  async function ({ productId, token }) {
    const toastId = toast.loading("Waiting.....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        return data.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

// get product from wishlist

export const getWishListProducts = createAsyncThunk(
  "whishlist/getWishListProducts",
  async function ({ token }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// remove product from wishlist

export const removeProductFromWishlist = createAsyncThunk(
  "whishlist/removeProductFromWishlist",
  async function ({ productId, token }, {dispatch}) {
    const toastId = toast.loading("Deleting Item Underprocessing....");
    try {
      if (!productId) {
        console.log("false");
      }

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      console.log(data);
if (data.status === "success") {
  toast.success(data.message);
  // * EDITED 👇
  const whishListProducts = await dispatch(getWishListProducts({token}))
  return whishListProducts.payload
}
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState: {
    data: null,
    error: null,
    isLoading: false,
    isError: false,
  },

  extraReducers: function (builder) {
    builder.addCase(
      getWishListProducts.fulfilled,
      function (previosState, action) {
        previosState.data = action.payload;
        previosState.error = null;
        previosState.isLoading = false;
        previosState.isError = false;
      }
    );
    builder.addCase(
      getWishListProducts.rejected,
      function (previosState, action) {
        previosState.data = null;
        previosState.error = action.payload;
        previosState.isLoading = false;
        previosState.isError = true;
      }
    );
    builder.addCase(
      getWishListProducts.pending,
      function (previosState, action) {
        previosState.data = null;
        previosState.error = null;
        previosState.isLoading = true;
        previosState.isError = false;
      }
    );

    builder.addCase(
      removeProductFromWishlist.fulfilled,
      function (previosState, action) {
        previosState.data = action.payload;
        previosState.error = null;
        previosState.isLoading = false;
        previosState.isError = false;
      }
    );
    builder.addCase(
      removeProductFromWishlist.rejected,
      function (previosState, action) {
        previosState.data = null;
        previosState.error = action.payload;
        previosState.isLoading = false;
        previosState.isError = true;
      }
    );
    builder.addCase(
      removeProductFromWishlist.pending,
      function (previosState, action) {
        previosState.data = action.payload;
        previosState.error = null;
        previosState.isLoading = true;
        previosState.isError = false;
      }
    );
  },
});

export const whishlistReducer = whishlistSlice.reducer;
