import express from "express";
import auth from "../middleware/auth.middware.js";
import {
  downloadImage,
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

export default imageRoutes;
