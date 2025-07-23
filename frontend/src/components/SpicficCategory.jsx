import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
function SpicficCategory() {
  const { allProductsData, getAllCart } = useContext(ProductContext);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const location = useLocation();
  const { cate } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allProductsData) {
      const fliterCategory = allProductsData.filter(
        (c) => c.category.toLowerCase() === cate.toLowerCase()
      );
      setCategoryProduct(fliterCategory);
    }
  }, [allProductsData, cate]);

  const addToCart = async (id, quantity) => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/carts/add`,
        { productId: id, quantity },
        { withCredentials: true }
      );
      if (result.status === 201 || 200) {
        toast.success(result.data.message);
        await getAllCart();
        navigate(`/cart`);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="w-full px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">
        Products By Category
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore the specific Products By Categories.
      </p>{" "}
      <div className="max-w-5xl mx-auto">
        <div className=" gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          {categoryProduct.length > 0 ? (
            categoryProduct.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-white border border-gray-500 shadow-md rounded-2xl p-2 w-72"
              >
                <img
                  className="w-72 h-48 object-cover rounded-2xl"
                  src={item.images[0]}
                  alt="image"
                />
                <div className="p-4 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold line-through text-red-400">
                      ${item.productPrice}
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ${item.offerPrice}
                    </span>
                  </div>
                  <p className="text-slate-800 text-base font-medium my-1.5">
                    {item.title.slice(0, 24)}
                  </p>
                  <p className="text-slate-500">
                    {item.description.slice(0, 100)}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Link
                      to={`/product-details/${item.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      state={{ productId: item._id }}
                      className="bg-slate-200 hover:bg-slate-400 hover:text-white rounded-lg cursor-pointer text-black py-2 text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(item._id, 1)}
                      className="hover:bg-slate-600 bg-slate-950 rounded-lg cursor-pointer text-white py-2"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-500 col-span-full text-2xl font-bold text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpicficCategory;
