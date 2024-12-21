/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function CategoriesCard({catInfo}) {
  return (
    <>
    <Link to={`/categories/subcategories/${catInfo._id}/${catInfo.name}`} className="col-span-12 md:col-span-4 lg:col-span-3 border-2 rounded-md hover:shadow-2xl shadow-black transition-shadow duration-300 overflow-hidden">
     <div className="img">
        <img className="w-full h-[230px] object-cover" src={catInfo.image} alt={catInfo.name} />
     </div>
     <h1 className="text-center capitalize text-3xl font-bold text-gray-600 py-5">{catInfo.name}</h1>
    </Link>
    </>
  )
}
