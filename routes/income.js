import express from 'express';
import {
    getAllIncomes,
    getIncome,
    addIncome,
    updateIncome,
    deleteIncome,
} from '../controllers/income.js';
import { auth } from '../utils/passport.js';
import { isUser } from '../middleware/isUser.js';

const router = express.Router();

router.get('/', auth, isUser, getAllIncomes);

router.get('/income/:id', auth, isUser, getIncome);

router.post('/add', auth, isUser, addIncome);

router.put('/income/:id', auth, isUser, updateIncome);

router.delete('/income/:id', auth, isUser, deleteIncome);

export default router;