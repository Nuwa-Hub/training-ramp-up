import { Router } from "express";
import passport from "passport";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signUpController,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/login", loginController);
userRouter.get("/refresh", refreshTokenController);
userRouter.post("/logout", logoutController);
// userRouter.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );
// userRouter.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000/",
//     failureRedirect: "/login/failed",
//   })
// );
// userRouter.get("/login/failed", (req, res) => {
//   res.status(400).send("failed to login");
// });

export default userRouter;
