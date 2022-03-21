import express from 'express';
import { auth } from '../utils/passport.js';
import { isUser } from '../middleware/isUser.js';
import { getAllCategories, updateCategories } from '../controllers/category.js';

const router = express.Router();

router.get('/', auth, isUser, getAllCategories);

router.put('/update', auth, isUser, updateCategories);

export default router;