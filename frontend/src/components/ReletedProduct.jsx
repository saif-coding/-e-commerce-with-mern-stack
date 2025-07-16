import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "./../context/ProductContext";
import { Link } from "react-router-dom";
function ReletedProduct({ cate }) {
  const { allProductsData } = useContext(ProductContext);
  const [reletedData, setReletedData] = useState([]);

  useEffect(() => {
    if (allProductsData) {
      const filter = allProductsData.filter((item) => item.category === cate);
      setReletedData(filter);
    }
  }, [allProductsData, cate]);

  return (
    <div className="w-full px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-medium capitalize text-slate-800 text-center mb-2 font-poppins">
        related products{" "}
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore the latest related products in our collection.
      </p>{" "}
      <div className="max-w-5xl mx-auto">
        <div className=" gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          {reletedData.map((product) => (
            <div className="flex flex-col bg-white border border-gray-500 shadow-md rounded-2xl p-2 w-72">
              <img
                className="w-72 h-48 object-cover rounded-2xl"
                src={product.images[0]}
                alt="image"
              />
              <div className="p-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold line-through text-red-400">
                    ${product.productPrice}
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${product.offerPrice}
                  </span>
                </div>
                <p className="text-slate-800 text-base font-medium my-1.5">
                  {product.title.slice(0, 24)}
                </p>
                <p className="text-slate-500">
                  {product.description.slice(0, 100)}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Link
                    to={`/product-details/${product.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    state={{ productId: product._id }}
                    className="bg-slate-200 hover:bg-slate-400 hover:text-white rounded-lg cursor-pointer text-black py-2 text-center"
                  >
                    View Details
                  </Link>
                  <button className="hover:bg-slate-600 bg-slate-950 rounded-lg cursor-pointer text-white py-2">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReletedProduct;
