import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Sinup from "./Pages/Sinup/Sinup";
import { Toaster } from "react-hot-toast";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GuseRoute from "./Components/GuseRoute/GuseRoute";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ConfirmedMessage from "./Components/ConfirmedMessage/ConfirmedMessage";
import ResetPasswordForm from "./Components/ResetPasswordForm/ResetPasswordForm";
import UserProvider from "./Components/Context/UserContext/User.context";
import CartProvider from "./Components/Context/CartContext/Cart.context";
import Cart from "./Pages/CartProducts/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Orders/Allorders";
import Online from "./Components/Online/Online";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Subcategories from "./Components/Subcategories/Subcategories";
import Brands from "./Components/Brands/Brands";
import BrandDialog from "./Components/BrandDialog/BrandDialog";
import { Provider } from "react-redux";
import { myStore } from "./Features/store";
import Wishlist from "./Components/Wishlish/Wishlist";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "*", element: <NotFound /> },
        { path: "cart", element: <Cart /> },
        { path: "productdetails/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Allorders /> },
        { path: "products", element: <Products /> },
        {path:"wishlist" , element:<Wishlist/>},
        { path: "categories", element: <Categories />,children:[
          { path:"subcategories/:id/:catname" , element:<Subcategories/>}
        ] },
        { path: "brands", element: <Brands />,children:[
          { path: "branddialog/:id", element: <BrandDialog /> },
        ] },

      
      ],
    },

    {
      path: "/",
      element: (
        <GuseRoute>
          <Layout />
        </GuseRoute>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "sinup", element: <Sinup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "confirmedmessage", element: <ConfirmedMessage /> },
        { path: "resetpasswordform", element: <ResetPasswordForm /> },
      ],
    },
  ]);
  let myClient = new QueryClient()
  return (
    <>
    <QueryClientProvider client={myClient}>
    <Online>
    <UserProvider>
      <Provider store={myStore}>
        <CartProvider>
          <RouterProvider router={routes} />
        </CartProvider>
        </Provider>
      </UserProvider>
      <Toaster />
    </Online>
    <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
    </>
  );
}

export default App;
