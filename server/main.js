import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataBaseConnection from "./config/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import passport from "./config/google.auth.js";
import session from "express-session";
import authRoutes from "./routes/google.auth.rotues.js";
import imageRoutes from "./routes/image.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173" , "https://bg-remover-app9.netlify.app/"],
  })
);

app.use(
  session({
    secret: "shriakntsoni",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

// dataBase Connection
await dataBaseConnection();

app.get("/", (req, res) => {
  res.send("Heloo from express...");
});

// user Routes
app.use("/api/user", userRoutes);

// image routes
app.use("/api/image", imageRoutes);

app.listen(process.env.PORT || 7000, (req, res) => {
  console.log(
    `App is listening On URL: http://localhost:${process.env.PORT || 7000}`
  );
});
