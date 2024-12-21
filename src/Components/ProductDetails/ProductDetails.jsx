/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Cartcontext } from "../Context/CartContext/Cart.context";
import ReactImageGallery from "react-image-gallery";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "../ProductCard/ProductCard";
import { Helmet } from "react-helmet";
import { userContext } from "../Context/UserContext/User.context";
import { useDispatch } from "react-redux";
import { addwhishlistData } from "../../Features/wishlistSlice";

export default function ProductDetails() {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const { addCartProducts } = useContext(Cartcontext);
  const { id } = useParams();

  const { token } = useContext(userContext);
  const dispatch = useDispatch();

  async function getSpecificProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };

      const { data } = await axios.request(options);
      setProducts(data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    getSpecificProductDetails();
  }, [id]);

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${products.data.category._id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setCategory(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (products === null) return;
    getRelatedProducts();
  }, [products]);

  return (
    <>
      <Helmet>
        <title> Product Details</title>
      </Helmet>

      <div className="mb-7">
        {!products ? (
          <Loading />
        ) : (
          <section className="grid grid-cols-12 gap-5">
            <div className="img col-span-12 md:col-span-3">
              <ReactImageGallery
                showNav={false}
                showPlayButton={false}
                items={products.data.images.map((product) => {
                  return { original: product, thumbnail: product };
                })}
              />
            </div>
            <div className="col-span-12 md:col-span-9 space-y-4">
              <div>
                <h3 className="capitalize text-primary-400">
                  {products.data.category.name}
                </h3>
                <h1 className="font-bold text-2xl text-gray-500 capitalize">
                  {products.title}
                </h1>
              </div>
              <p className="capitalize text-slate-500">
                {products.data.description}
              </p>
              <div className="price-rating-average flex justify-between items-center">
                <span className="inline-block price">
                  {products.data.price} EGP
                </span>
                <div className="rating">
                  <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                  <span> {products.data.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  addCartProducts({ productId: id });
                }}
                className="btn w-full"
              >
                Add To Cart
              </button>
              <button
                onClick={() => {
                  dispatch(addwhishlistData({ productId: products.data._id, token }));
                }}
                className="bg-gray-200 w-full py-1 rounded-md font-bold text-black hover:bg-gray-600 transition-colors duration-300 hover:text-white"
              >
                {" "}
                Add To Whishlist
              </button>
            </div>
          </section>
        )}

        <div className="mt-12">
          <h2 className="mb-2 text-gray-500 text-3xl">Related Products</h2>
          {!category ? (
            <Loading />
          ) : (
            <section>
              <div>
                <swiper-container slides-per-view="6" autoplay loop={true}>
                  {category.map((cat) => (
                    <SwiperSlide key={cat.id}>
                      <ProductCard productInfo={cat} />
                    </SwiperSlide>
                  ))}
                </swiper-container>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
