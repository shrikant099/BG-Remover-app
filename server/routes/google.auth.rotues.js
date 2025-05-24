import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const { token, user } = req.user;

    // Frontend URL pe redirect kar do with token
    res.redirect(`http://localhost:5173/login-success?token=${token}`);
  }
);

export default router;
