import { users } from '../data/users.js';

const login = (req, res) => {
    try {
        const userData = req.body;
        const newUser = users.filter(user => user.name === userData.name &&
            user.password === userData.password);

        if (newUser.length === 0) {
            throw new Error('Username or password is incorrect')
        }

        res.status(200).json({ message: 'Login completed', data: newUser })
    } catch (e) {
        res.status(404).json({ message: 'Error!', err: e.message })
    }
}

const logout = (req, res) => {
    res.status(200).json({ message: 'Logout completed' })
}

export { login, logout }