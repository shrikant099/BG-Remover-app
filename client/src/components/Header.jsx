// src/components/Header.jsx
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { logo } from "@/assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "@/redux/userSlice";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";
import { User } from "lucide-react"; // user icon from lucide-react

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user.user);

  const token = Cookie.get("token");
  useEffect(() => {
    if (token && !user) {
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
    }
  }, [dispatch, user]);
  
  useEffect(() => {
    if (user && user.id) {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/get-with/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setUser(data.data));
        })
        .catch((err) => console.error(err));
    }
  }, [user]); // ← user pe dependency zaroori hai

  const handleLogout = () => {
    Cookie.remove("token");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="bg-white/60 backdrop-blur-lg shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
          <Link to="/" className="text-xl font-bold text-gray-800">
            Instant{" "}
            <span className="text-purple-600 font-bold font-mono">BG</span>{" "}
            Remover
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          <p className="text-gray-800 font-medium">
            Credits:{user?.credits || 0}
          </p>

          {user ? (
            <div className="relative z-[9999]">
              <User
                className="cursor-pointer w-6 h-6 text-gray-800 hover:text-blue-600"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {showDropdown && (
                <div className="absolute right-0 p-2 mt-2 w-40 bg-white border rounded shadow-lg">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  <Link
                    to="/history"
                    className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    History
                  </Link>
                  <Link
                    to="/buy"
                    className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    Pricing
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="hover:text-blue-600">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
