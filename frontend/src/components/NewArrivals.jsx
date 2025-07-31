import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";

function NewArrivals() {
  const [loading, setLoading] = useState(false);
  const { getAllCart } = useContext(ProductContext);
  const [threeProducts, setThreeProducts] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/getall`,
        { withCredentials: true }
      );
      setThreeProducts(result.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

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
  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="w-full px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">
        New Arrivals
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore the latest additions to our collection.
      </p>{" "}
      <div className="max-w-5xl mx-auto">
        <div className=" gap-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          {threeProducts.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
