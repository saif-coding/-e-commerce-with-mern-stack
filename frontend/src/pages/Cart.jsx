import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";
function Cart() {
  const [showAddress, setShowAddress] = useState(false);
  const { getAllCart, userCart, getAddress, addressData } =
    useContext(ProductContext);
  console.log(addressData);
  const { id } = useParams();
  const navigate = useNavigate();

  const decreaseQuantity = async (productId) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/carts/down`,
        { productId },
        { withCredentials: true }
      );
      if (result.status === 200 || result.status === 201) {
        toast.success(result.data.message);
        await getAllCart();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/carts/upper`,
        { productId },
        { withCredentials: true }
      );
      if (result.status === 200) {
        toast.success(result.data.message);
        await getAllCart();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const removeProductFromCart = async (productId) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/carts/remove`,
        { productId },
        { withCredentials: true }
      );
      if (result.status === 200) {
        toast.success(result.data.message);
        await getAllCart();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCart();
    getAddress();
  }, [id]);

  return (
    <>
      {userCart.length > 0 ? (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-medium mb-6">
              Shopping Cart{" "}
              <span className="text-sm text-indigo-500">
                {userCart.length} Items
              </span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {userCart?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                    <img
                      className="max-w-full h-full object-cover"
                      src={item?.productId?.images[0]}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold">
                      {item.productId.title.slice(0, 12)}
                    </p>
                    <div className="font-normal ">
                      <p>
                        Total Qty: <span>{item.quantity || "N/A"}</span>
                      </p>
                      <div className="flex items-center">
                        <div className="border mt-2 px-4 rounded-xl flex items-center text-sm h-6 gap-x-8 font-bold">
                          <h1
                            onClick={() => decreaseQuantity(item.productId._id)}
                            className=" text-red-600"
                          >
                            <FaMinusCircle />
                          </h1>
                          <h1
                            onClick={() => increaseQuantity(item.productId._id)}
                            className=" text-[#4F39F6]"
                          >
                            <FaPlusCircle />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  ${item.productId.offerPrice * item.quantity}
                </p>
                <button
                  onClick={() => removeProductFromCart(item.productId._id)}
                  className="cursor-pointer mx-auto"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <Link
              to={"/all-products"}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
            >
              <svg
                width="15"
                height="11"
                viewBox="0 0 15 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="#615fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative flex justify-between items-start mt-2">
                {showAddress && (
                  <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                    <p
                      onClick={() => setShowAddress(false)}
                      className="text-gray-500 p-2 hover:bg-gray-100"
                    >
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>Name:</strong> {addressData.address.fullName}
                        </p>
                        <p>
                          <strong>Email:</strong> {addressData.address.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {addressData.address.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {addressData.address.street}
                          , {addressData.address.city},{" "}
                          {addressData.address.state} -{" "}
                          {addressData.address.zip}
                        </p>
                        <p>
                          <strong>Country:</strong>{" "}
                          {addressData.address.country}
                        </p>
                      </div>
                    </p>

                    {showAddress.length > 0 ? (
                      // ✅ Address exists → Show "Update address"
                      <Link to={"/address"}>
                        <p
                          onClick={() => {
                            navigate("/address");
                            setShowAddress(false);
                          }}
                          className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                        >
                          Update address
                        </p>
                      </Link>
                    ) : (
                      // ❌ No address → Show "Add address"
                      <Link to={"/address"}>
                        <p
                          onClick={() => {
                            navigate("/address");
                            setShowAddress(false);
                          }}
                          className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                        >
                          Add address
                        </p>
                      </Link>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-indigo-500 hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <p className="text-sm font-medium uppercase mt-6">
                Payment Method
              </p>

              <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>$20</span>
              </p>
              <p className="flex justify-between">
                <span>Total Quantity</span>
                <span>
                  {userCart.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              </p>
              <p className="flex justify-between text-l font-medium mt-3">
                <span>Total Amount:</span>
                <span>
                  $
                  {userCart
                    .reduce(
                      (acc, pro) =>
                        acc + pro.productId.offerPrice * pro.quantity,
                      0
                    )
                    .toFixed(2)
                    .toLocaleString()}
                </span>
              </p>
            </div>

            <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4 bg-white rounded-xl shadow-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329108.png"
            alt="Empty Cart"
            className="w-32 h-32 mb-4 opacity-80"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-4">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            to={"/all-products"}
            className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
