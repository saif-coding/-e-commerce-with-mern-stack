import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeletePopup from "../components/DeletePopup";
import { useNavigate } from "react-router-dom";
function AdminProducts() {
  const { allProductsData } = useContext(ProductContext);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const handleUpdateDetails = (title, id) => {
    // You can add any logic here (e.g., logging, validation)
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product-update/${slug}`, {
      state: { productId: id },
    });
  };
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {allProductsData.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    ${product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={product.inStock}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>

                  <td className="px-4 py-3">
                    <td
                      onClick={() =>
                        handleUpdateDetails(product.title, product._id)
                      }
                      className=" text-2xl pr-3 text-[#6366F1]"
                    >
                      <FaEdit />
                    </td>
                    <td
                      onClick={() => setShowDelete(!showDelete)}
                      className=" text-2xl text-red-500"
                    >
                      <MdDelete />
                    </td>
                    {showDelete && (
                      <DeletePopup pro={setShowDelete} id={product._id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminProducts;
