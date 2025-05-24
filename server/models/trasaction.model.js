import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageModel"
    },
    plan: {
        type: String,
        enum: ["monthly" , "yearly"]
    },
    creditsAdded: {
        type: Number
    },
    stripePaymentId: {
        type: String
    }
} , {timestamps: true})

const TransactionModel = mongoose.model("TransactionModel" , TransactionSchema)