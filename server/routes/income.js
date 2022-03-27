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

router.get('/:id', auth, isUser, getAllIncomes);

router.get('/income/:accountId/:incomeId', auth, isUser, getIncome);

router.post('/add/:accountId', auth, isUser, addIncome);

router.put('/income/:accountId/:incomeId', auth, isUser, updateIncome);

router.delete('/income/:accountId/:incomeId', auth, isUser, deleteIncome);

export default router;