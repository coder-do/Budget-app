import express from 'express';
import { auth } from '../utils/passport.js';
import { isUser } from '../middleware/isUser.js';
import {
    getAllAccounts,
    getAccount,
    addAccount,
    updateAccount,
    deleteAccount
} from '../controllers/account.js';

const router = express.Router();

router.get('/all', auth, isUser, getAllAccounts);

router.get('/:id', auth, isUser, getAccount);

router.post('/', auth, isUser, addAccount);

router.put('/account/:id', auth, isUser, updateAccount);

router.delete('/account/:id', auth, isUser, deleteAccount);

export default router;