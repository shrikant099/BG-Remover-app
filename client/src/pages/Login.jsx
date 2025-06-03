import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { jwtDecode } from "jwt-decode";
// import { BeatLoader } from "react-spinners";
import { useLoader } from "../context/loaderContext";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  const handleGoogleLogin = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/google`,
      "_self"
    );
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    showLoader();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      const token = res.data.token;
      const decodedUser = jwtDecode(token);
      if (token) {
        Cookies.set("token", token, { expires: 7 });
        dispatch(setUser(decodedUser));

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });

        navigate("/");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error("Login failed", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen flex items-center justify-center bg-white/60 backdrop-blur-lg px-6"
      >
        <div className="max-w-md w-full bg-white/80 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full cursor-pointer flex items-center justify-center gap-2 border-gray-300 hover:border-blue-600 mb-6"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="example@mail.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
            >
              Login
            </Button>
            <p className="text-center text-sm text-gray-600 mt-4">
              New user?{" "}
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-[100000] mt-[70px]" // 👈 Add high z-index
        />{" "}
      </motion.div>
    </>
  );
};

export default Login;
