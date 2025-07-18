import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const [allProductsData, setAllProductsData] = useState([]);
  const [search, setSearch] = useState("");
  const [userCart, setUserCart] = useState([]);

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

  useEffect(() => {
    getAllProducts();
    getAllCart();
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
