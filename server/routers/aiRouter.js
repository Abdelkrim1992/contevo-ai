import express from 'express';
import multer from 'multer';
import { generateArticle, generateTitles, generateImage, reviewResume, removeBackground, removeObject, getGenerations } from '../controllers/aiController.js';
import protectRoutes from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate-article', protectRoutes, generateArticle);
router.post('/generate-titles', protectRoutes, generateTitles);
router.post('/generate-image', protectRoutes, generateImage);
router.post('/review-resume', protectRoutes, upload.single('resume'), reviewResume);
router.post('/remove-background', protectRoutes, upload.single('image'), removeBackground);
router.post('/remove-object', protectRoutes, upload.single('image'), removeObject);
router.get('/generations', protectRoutes, getGenerations);

export default router;
