import express from 'express';
import { addUser, getUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.get('/:id', getUser)

router.post('/', addUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router;