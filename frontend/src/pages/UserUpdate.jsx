import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
function UserUpdate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleUser, getSingleUser } = useContext(UserContext);

  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (singleUser) {
      setUpdateData({
        name: singleUser.name,
        email: singleUser.email,
      });
    }
  }, [singleUser]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/update/${id}`,
        updateData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        await getSingleUser();
        navigate("/profile");
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to load user");
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="bg-white text-gray-500 h-72  mt-7 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-1xl capitalize font-bold text-gray-800 text-center mb-5">
          Update your profile
        </h2>{" "}
        <form onSubmit={updateUser}>
          <input
            onChange={handleChange}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Enter your name"
            required
            name="name"
            value={updateData.name}
          />
          <input
            onChange={handleChange}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            value={updateData.email}
          />

          <button
            type="submit"
            className="w-full mb-3 mt-8 bg-indigo-500 cursor-pointer py-2.5 rounded-full text-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserUpdate;
