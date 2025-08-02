import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const AddressUpdate = () => {
  const { addressData, getAddress } = useContext(ProductContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  useEffect(() => {
    const updatedData = addressData.address;
    if (updatedData) {
      setAddress({
        fullName: updatedData.fullName,
        email: updatedData.email,
        phone: updatedData.phone,
        street: updatedData.street,
        city: updatedData.city,
        state: updatedData.state,
        zip: updatedData.zip,
        country: updatedData.country,
      });
    }
  }, [addressData]);
  useEffect(() => {
    getAddress();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/address/update`,
        address,
        { withCredentials: true }
      );
      if (result.status === 200) {
        toast.success(result.data.message);
        navigate("/cart");
        await getAddress();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" bg-black/80 absolute w-full h-auto top-0 left-0">
      <div className="max-w-xl mx-auto mt-10 p-6 my-20 shadow-md bg-white rounded-md">
        <div className=" flex items-center gap-12 mb-3">
          <div
            onClick={() => navigate("/cart")}
            className=" flex items-center border w-24 rounded-full gap-2 cursor-pointer text-sm px-4 py-1"
          >
            <span>
              <FaArrowAltCircleLeft />
            </span>
            <button>Back </button>
          </div>{" "}
          <h2 className="text-2xl font-bold mb-4">
            Update Your Delivery Address
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={address.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={address.zip}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Update Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressUpdate;
