import express from 'express';
import { getFAQs, updateFAQ } from '../controllers/faq.js';
import { isUser } from '../middleware/isUser.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { auth } from '../utils/passport.js';

const router = express.Router();

router.get('/questions', auth, isUser, getFAQs);

router.put('/questions/update/:id', auth, isAdmin, updateFAQ);

export default router;