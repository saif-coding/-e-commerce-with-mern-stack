import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
function Login() {
  const { getAllCart } = useContext(ProductContext);
  const { getSingleUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        loginData,
        { withCredentials: true }
      );
      if (result.status === 200) {
        await getSingleUser();
        await getAllCart();
        navigate("/");
        toast.success(result.data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Login to Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Start your journey with ShopVerse
        </p>

        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            value={loginData.email}
          />
          <input
            onChange={handleChange}
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
            name="password"
            value={loginData.password}
          />
          <div className="text-right py-4">
            <a className="text-blue-600 underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white"
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to={"/register"} href="#" className="text-blue-500 underline">
            Signup
          </Link>
        </p>

        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Log in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
