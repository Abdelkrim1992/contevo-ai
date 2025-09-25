import express from "express";
import AuthController from "../controllers/authController.js";

//auth routes
const router = express.Router()

router.post('/signup', AuthController().signup)
router.post('/signin', AuthController().signin)
router.post('/signout', AuthController().signout)

export default router