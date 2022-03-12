import express from 'express';
import { auth } from '../utils/passport.js';
import { login, logout } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/logout', auth, logout);

export default router;