import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import validator from "validator";

//genereate token
export const generateToken = (id, name, email, credits) => {
  return jwt.sign({ id, name, email, credits }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ success: true, message: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user.id, user.name, user.email, user.credits);
    res.status(201).json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = generateToken(user.id, user.name, user.email, user.credits);
    return res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User With Id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Forbidden: Not allowed" });
    }

    const user = await UserModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, login, getUserById };
