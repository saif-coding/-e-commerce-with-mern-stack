import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const [allProductsData, setAllProductsData] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);
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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ allProductsData, getAllProducts, setSearch, search }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
