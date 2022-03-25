import express from 'express';
import { auth } from '../utils/passport.js';
import { isUser } from '../middleware/isUser.js';
import { getAllCategories } from '../controllers/category.js';

const router = express.Router();

router.get('/', auth, isUser, getAllCategories);

export default router;