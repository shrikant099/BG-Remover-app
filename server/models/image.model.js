import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    orignalImageUrl: {
        type: String
    },
    bgRemovedImageUrl: {
        type: String
    }
} , {timestamps: true})

const ImageModel = mongoose.model("ImageModel" , imageSchema)

export default ImageModel