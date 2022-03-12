import { users } from '../data/users.js';

const getUser = (req, res) => {
    const user = users.filter(el => el.id === +req.params.id)
    res.json(user)
}

const addUser = (req, res) => {
    users.push(req.body);
    res.status(200).json({ message: 'New user added succesfully' })
}

const updateUser = (req, res) => {
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
}

const deleteUser = (req, res) => {
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
}

export { addUser, getUser, deleteUser, updateUser }