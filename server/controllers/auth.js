import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(404).json({ message: 'Please, check email and password and try again' });
            }

            else {
                const token = jwt.sign(
                    { email, password },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN }
                );
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
            }
        })
}

const logout = (req, res) => {
    return req.session.destroy(() => {
        res.status(200).json({ message: 'Logout completed!' });
    })
}

export { login, logout }