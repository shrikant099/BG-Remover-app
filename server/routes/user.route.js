import express from "express";
import {
  getUserById,
  login,
  registerUser,
} from "../controller/user.controller.js";
import auth from "../middleware/auth.middware.js";
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", login);
userRoutes.get("/get-with/:id", auth, getUserById);

export default userRoutes;
