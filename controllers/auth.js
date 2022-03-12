import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../utils/loginHelpers.js';

const login = (req, res) => {
    try {
        const { email, password } = req.body;

        const token = jwt.sign(
            { email, password },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const user = getUserByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            req.session.role = user.role;
            req.session.token = `Bearer ${token}`
            return req.session.save(() => {
                res.status(200).json({
                    message: 'Login completed',
                    data: user,
                    session: req.session
                });
            });
        } else {
            res.status(404).json({ message: 'Not found! Try again.' });
        }
    } catch (e) {
        res.json({ message: 'Error!', err: e.message });
    }
}

const logout = (req, res) => {
    return req.session.destroy(() => {
        res.status(200).json({ message: 'Logout completed!' });
    })
}

export { login, logout }