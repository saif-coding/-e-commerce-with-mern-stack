import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const [allProductsData, setAllProductsData] = useState([]);
  const [search, setSearch] = useState("");
  const [userCart, setUserCart] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [oneRevie, setOneRevie] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  
  const getAllProducts = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/getall`,
        { withCredentials: true }
      );
      setAllProductsData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCart = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/carts/get`,
        { withCredentials: true }
      );
      setUserCart(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async (productId) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/reviews/get/${productId}`,
        { withCredentials: true }
      );
      setReviewsData(result.data);
      setOneRevie(result.data.slice(0, 1));
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/address/get`,
        { withCredentials: true }
      );
      setAddressData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/get`,
        { withCredentials: true }
      );
      setAllOrders(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCart();
    getAllOrders();
    // getReviews();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProductsData,
        getAllProducts,
        setSearch,
        search,
        userCart,
        setUserCart,
        getAllCart,
        setReviewsData,
        reviewsData,
        getReviews,
        oneRevie,
        setOneRevie,
        getAddress,
        addressData,
        allOrders,
        getAllOrders,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
