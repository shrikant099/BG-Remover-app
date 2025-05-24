import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Model3 } from "@/assets/assets";
import CardsSection from "./CardsSection";
import BackgroundRemoverSection from "./BackgroundRemoverSection";
import Rated from "./Rated";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useLoader } from "@/context/loaderContext";

const Home = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const ifUserExists = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // get Token
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async () => {
    // Redirect if not logged in or user not found
    if (!token || !ifUserExists) {
      navigate("/login");
      return;
    }

    // Check credits
    if ((ifUserExists.credits || 0) <= 0) {
      toast.error("You have no credits left. Please purchase more credits.");
      navigate("/buy");
      return;
    }

    // No file selected
    if (!selectedFile) {
      toast.warning("Please select an image first.");
      return;
    }

    try {
      showLoader();

      // Prepare form data
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Send request
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/image/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = data.data.bgRemovedImageUrl;

      // Success actions
      toast.success("Background Removed Succesfully");
      setUploadedImageUrl(imageUrl);
      setSelectedFile(null);
    } catch (error) {
      const message =
        error?.response?.data?.message || "An error occurred while uploading.";
      toast.error(message);
    } finally {
      hideLoader();
    }
  };

  const handleDownloadClick = async () => {
    if (!uploadedImageUrl) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/image/download-image?url=${encodeURIComponent(
          uploadedImageUrl
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "background_removed_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error("Download failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-12">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image section */}
          <motion.div
            initial={{ x: -180, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="rounded-2xl relative z-0 overflow-hidden backdrop-blur-2xl shadow-lg border border-gray-200 min-h-[550px] flex items-center justify-center"
            style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.1)" }}
          >
            <img
              src={Model3}
              alt="Background Removed Example"
              className="max-h-[550px] w-auto object-contain"
            />
          </motion.div>

          {/* Upload section */}
          <motion.div
            initial={{ x: 180, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white rounded-3xl p-16 shadow-lg border border-gray-200"
          >
            <h2 className="text-5xl font-extrabold mb-8 text-gray-900 tracking-wide leading-tight">
              Remove{" "}
              <span className="text-purple-600 font-bold">Background</span>{" "}
              <br /> Instantly
            </h2>
            <p className="text-gray-600 mb-12 max-w-lg leading-relaxed font-medium">
              Upload your image and get a background-free version in seconds.
            </p>

            {/* Upload area */}
            {/* Upload area */}
            <div className="relative border-4 border-dashed border-gray-300 rounded-3xl p-16 bg-gray-100">
              <Upload className="mx-auto mb-8 w-16 h-16 text-purple-500 animate-pulse" />
              <p className="text-xl font-semibold text-purple-600 mb-8 text-center">
                {selectedFile
                  ? selectedFile.name
                  : "Click to choose your image"}
              </p>

              <div className="flex flex-col gap-4 items-center">
                <button
                  type="button"
                  onClick={handleChooseClick}
                  className="px-10 py-4 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 transition"
                >
                  Choose File
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="px-10 py-4 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-400 transition"
                  >
                    Submit
                  </button>
                )}
              </div>

              {/* Hidden input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Image preview and Download button (Added below) */}
              {uploadedImageUrl && (
                <div className="mt-8 text-center">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Preview
                  </h3>
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded Preview"
                    className="mx-auto max-h-64 rounded-lg shadow-md"
                  />
                  <button
                    onClick={handleDownloadClick}
                    className={`mt-4 inline-block px-8 py-3 rounded-full transition cursor-pointer ${
                      uploadedImageUrl
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!uploadedImageUrl}
                  >
                    Download Image
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <CardsSection />
      <div className="flex flex-col justify-center items-center py-12 px-5 mt-5">
        <BackgroundRemoverSection />
      </div>
      <div className="bg-gradient-to-b from-white to-gray-100 py-2 px-4 md:px-20">
        <Rated />
        <ToastContainer theme="dark" />
      </div>
    </>
  );
};

export default Home;
