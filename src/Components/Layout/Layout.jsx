/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import useOnline from "../../Hooks/useOnline";

export default function Layout() {
  const isOlinle = useOnline();

  return (
    <>
      <Navbar />

      <div className="container py-20 min-h-[60vh]">
        <Outlet />
      </div>

      <Footer />

     
    </>
  );
}
