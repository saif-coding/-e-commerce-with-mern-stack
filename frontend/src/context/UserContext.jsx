import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();
function UserContextProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const getAllUsers = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/getalluser`,
        { withCredentials: true }
      );
      setAllUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleUser = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/getsingleuser`,
        { withCredentials: true }
      );
      setSingleUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
    getSingleUser();
  }, []);

  return (
    <UserContext.Provider value={{ allUsers, singleUser,getSingleUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
