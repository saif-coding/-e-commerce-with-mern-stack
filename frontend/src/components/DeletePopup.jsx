import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
function DeletePopup({ pro, id }) {
  const navigate = useNavigate();
  const { getAllProducts } = useContext(ProductContext);
  const deleteProduct = async () => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/products/delete/${id}`,
        { withCredentials: true }
      );
      if (result.status === 200) {
        toast.success(result.data.message);
        await getAllProducts();
        navigate("/dashboard/productlist");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="absolute bg-black/60 top-0 left-0 w-full h-screen">
      <div class="flex flex-col items-center  absolute top-20 right-32 bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-300">
        <div class="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
              stroke="#DC2626"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
        <p class="text-sm text-gray-600 mt-2 text-center">
          Do you really want to continue? This action <br /> cannot be undone.
        </p>
        <div class="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            onClick={() => pro(false)}
            type="button"
            class="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteProduct()}
            type="button"
            class="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
