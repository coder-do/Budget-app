import { users } from '../data/users.js';
import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
    const user = users.filter(el => el.id === +req.params.id)
    res.json(user)
})

router.post('/', (req, res) => {
    users.push(req.body);
    res.status(200).json({ message: 'New user added succesfully' })
})

router.put('/:id', (req, res) => {
    try {
        const id = +req.params.id
        const newUser = users.filter(user => user.id === id);

        if (newUser.length === 0) {
            throw new Error('User doesn`t exist')
        }
        users.map(user => {
            if (user.id === id) {
                for (let key in user) {
                    if (req.body.hasOwnProperty(key)) {
                        user[key] = req.body[key]
                    }
                }
            }
            return user;
        })
        res.status(200).json({ message: 'User data updated succesfully', newUser })
    } catch (e) {
        res.status(404).json({ message: 'Error!', err: e.message })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const id = +req.params.id;
        const newUser = users.filter(user => user.id === id);

        if (newUser.length === 0) {
            throw new Error('User doesn`t exist')
        }
        users.splice(users.indexOf(newUser[0]), 1)
        console.log(users);
        res.status(200).json({ message: 'User removed succesfully', newUser })
    } catch (e) {
        res.status(404).json({ message: 'Error!', err: e.message })
    }
})

export default router;

/**
 * * GET - :id get by id
 * * POST - add new
 * * PUT - :id update by id
 * * DELETE - :id remove item by id from array
 */