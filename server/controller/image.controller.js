import ImageModel from "../models/image.model.js";
import axios from "axios";
import cloudinary from "../utils/cloudinary.utils.js";
import qs from "qs";
import UserModel from "../models/user.model.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.id;
    const leftCredits = req.user.credits;

    if (!file) return res.status(400).json({ message: "Image Required" });

    if (leftCredits <= 0) {
      return res.status(403).json({ message: "Buy Credits!" });
    }

    // Convert buffer to base64 for remove.bg
    const base64Image = file.buffer.toString("base64");

    //  Call remove.bg to get bgRemovedBuffer
    let bgRemovedBuffer;
    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        qs.stringify({ image_file_b64: base64Image, size: "auto" }),
        {
          headers: {
            "X-Api-Key": process.env.REMOVE_BG_API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          responseType: "arraybuffer",
        }
      );

      if (!response?.data) {
        return res
          .status(500)
          .json({ message: "Invalid response from remove.bg" });
      }

      bgRemovedBuffer = Buffer.from(response.data);
    } catch (err) {
      console.log("remove.bg error:", err.response?.data || err.message);
      return res.status(400).json({
        message: "remove.bg failed",
        error: err.response?.data || err.message,
      });
    }

    //  Parallel Upload to Cloudinary
    const [originalUpload, bgRemovedUpload] = await Promise.all([
      new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "originals" }, (err, result) =>
            err ? reject(err) : resolve(result)
          )
          .end(file.buffer);
      }),
      new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "removed_bgs" }, (err, result) =>
            err ? reject(err) : resolve(result)
          )
          .end(bgRemovedBuffer);
      }),
    ]);

    const saveImage = await ImageModel.create({
      userId,
      orignalImageUrl: originalUpload.secure_url,
      bgRemovedImageUrl: bgRemovedUpload.secure_url,
    });

    // Reduce 1 credit
    await UserModel.findByIdAndUpdate(userId, { $inc: { credits: -1 } });

    return res.status(200).json({
      success: true,
      message: "Background Removed Successfully",
      data: saveImage,
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const downloadImage = async (req, res) => {
  const imageUrl = req.query.url;

  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

  res.set({
    "Content-Type": response.headers["content-type"],
    "Content-Disposition": 'attachment; filename="background_removed.png"',
  });

  res.send(response.data);
};

export { uploadImageController , downloadImage };
