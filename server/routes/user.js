import express from 'express';
import { addUser, getUser, updateUser, deleteUser } from '../controllers/user.js';
import { isUser } from '../middleware/isUser.js';
import { auth } from '../utils/passport.js';

const router = express.Router();

router.get('/:id', auth, isUser, getUser);

router.post('/', auth, isUser, addUser);

router.put('/:id', auth, isUser, updateUser);

router.delete('/:id', auth, isUser, deleteUser);

export default router;