import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccount,
  getCurrentUser,
} from "../controller/user.controller.js";
import { Protected } from "../middleware/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(Protected, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(Protected, changePassword);
router.route("/update-account").patch(Protected, updateAccount);
router.route("/current-user").get(Protected, getCurrentUser);
export default router;
