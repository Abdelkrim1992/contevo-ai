import express from 'express'
import UserController from '../controllers/userController.js'
import protectRoutes from '../middlewares/authMiddleware.js'

//user routes
const router = express.Router()

router.route('/profile')
   .get(protectRoutes, UserController().getUserProfile)
   .put(protectRoutes, UserController().updateUserProfile)

export default router       