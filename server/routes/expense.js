import express from 'express';
import {
    getAllExpenses,
    getExpense,
    updateExpense,
    addExpense,
    deleteExpense
} from '../controllers/expense.js';
import { auth } from '../utils/passport.js';
import { isUser } from '../middleware/isUser.js';

const router = express.Router();

router.get('/:id', auth, isUser, getAllExpenses);

router.get('/expense/:accountId/:expenseId', auth, isUser, getExpense);

router.post('/add/:accountId', auth, isUser, addExpense);

router.put('/expense/:accountId/:expenseId', auth, isUser, updateExpense);

router.delete('/expense/:accountId/:expenseId', auth, isUser, deleteExpense);

export default router;