import express from 'express';
import { getFAQs, updateFAQ } from '../controllers/faq.js';

const router = express.Router();

router.get('/questions', getFAQs)

router.put('/questions/update/:id', updateFAQ)

export default router;