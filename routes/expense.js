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

router.get('/', auth, isUser, getAllExpenses);

router.get('/expense/:id', auth, isUser, getExpense);

router.post('/add', auth, isUser, addExpense);

router.put('/expense/:id', auth, isUser, updateExpense);

router.delete('/expense/:id', auth, isUser, deleteExpense);

export default router;