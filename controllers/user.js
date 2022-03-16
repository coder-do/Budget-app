import User from '../models/user.js';

const getUser = (req, res) => {
    User.findById(req.session.passport.user._id)
        .then(data => {
            res.status(200).json(data);
        })
}

const addUser = (req, res) => {
    User.create(req.body)
        .then(() => {
            res.status(200).json({ message: 'New user added succesfully' });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ message: 'User data updated succesfully' });
        })
        .catch(err => {
            res.status(404).json({ message: err.message });
        })
}

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'User data with transactions removed from database succesfully' });
        })
        .catch(err => {
            res.status(404).json({ message: err.message });
        })
}

export { addUser, getUser, deleteUser, updateUser }