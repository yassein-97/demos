/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BrandDialog({ handleDialogShow }) {
  const { id } = useParams();

  const [dialogContent, setDialogContent] = useState(null);

  async function getDataFromServer() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    setDialogContent(data.data);
  }

  useEffect(() => {
    getDataFromServer();
  }, [id]);

  return (
    <>
      {dialogContent && (
        <div className="fixed inset-0 bg-black/20">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 border-2 h-1/2 bg-white flex flex-col justify-between items-end p-6">
            <i
              onClick={() => {
                handleDialogShow();
              }}
              className="fa-solid fa-x p-2 bg-red-600 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
            ></i>
            <div className=" w-full flex justify-between items-center py-7 px-2 capitalize font-bold text-3xl text-gray-700 border-b-2 border-t-2 h-1/2">
              <span className="text-red-700">{dialogContent.name}</span>
              <div className="w-1/2">
                <img
                  className="w-full h-[100px] object-cover"
                  src={dialogContent.image}
                  alt={dialogContent.name}
                />
              </div>
            </div>
            <button
              onClick={() => {
                handleDialogShow();
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
