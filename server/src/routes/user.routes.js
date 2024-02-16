import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, registerUser, updateAccountDetails } from "../controllers/user.controller.js";
import {verifyJwt} from '../middlewares/auth.middleware.js';

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/get-user").get(verifyJwt, getCurrentUser);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/update-account").patch(verifyJwt, updateAccountDetails);

export default router;