import express from "express";
import auth from "../middleware/auth.middware.js";
import {
  downloadImage,
  getHistory,
  uploadImageController,
} from "../controller/image.controller.js";
import upload from "../middleware/uploadImage.middlware.js";

const imageRoutes = express.Router();

imageRoutes.post(
  "/upload",
  auth,
  upload.single("image"),
  uploadImageController
);
//  Download Image
imageRoutes.get("/download-image", auth, downloadImage);

// History API
imageRoutes.get("/history", auth, getHistory);
export default imageRoutes;
