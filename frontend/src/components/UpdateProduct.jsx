import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ProductContext } from "../context/ProductContext";

function UpdateProduct() {
  const { title } = useParams();
  const location = useLocation();
  const id = location.state.productId;
  const { getAllProducts, allProductsData } = useContext(ProductContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [images, setImages] = useState([null, null, null, null]); // for 4 images
  const [imageError, setImageError] = useState();
  const filterProducts = allProductsData.find((product) => product._id === id);
  useEffect(() => {
    if (filterProducts) {
      setProductName(filterProducts.title);
      setProductDescription(filterProducts.description);
      setCategory(filterProducts.category);
      setProductPrice(filterProducts.productPrice);
      setOfferPrice(filterProducts.offerPrice);
    }
  }, [filterProducts, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Validate all 4 images are selected
    const allImagesFilled = images.every((img) => img !== null);
    if (!allImagesFilled) {
      setImageError("All 4 images are required.");
      setLoading(false); // ❗ Important: stop loading
      return;
    }

    setImageError(""); // ✅ Clear error if validation passes

    // ✅ Prepare form data
    const formData = new FormData();
    formData.append("title", productName);
    formData.append("description", productDescription);
    formData.append("category", category);
    formData.append("productPrice", productPrice);
    formData.append("offerPrice", offerPrice);

    images.forEach((image) => {
      if (image) {
        formData.append("images", image); // multiple images
      }
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/update/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        await getAllProducts();
        navigate("/dashboard/productlist");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <h1>Update Products</h1>
        <div>
          <p className="text-base font-medium">Product Image</p>
          {imageError && (
            <p className="text-red-500 text-sm mb-3">{imageError}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const newImages = [...images];
                      newImages[index] = e.target.files[0];
                      setImages(newImages);
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer "
                    src={
                      images[index]
                        ? URL.createObjectURL(images[index])
                        : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {[
              { name: "Electronics" },
              { name: "Clothing" },
              { name: "Accessories" },
              { name: "Shoes" },
            ].map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
}
export default UpdateProduct;
