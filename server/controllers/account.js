import Account from "../models/account.js";

const getAllAccounts = (req, res) => {
    Account.find({ userId: req.session.passport.user._id })
        .then(data => {
            res.status(200).json(data);
        })
}

const getAccount = (req, res) => {
    const id = req.params.id;
    Account.find({ userId: req.session.passport.user._id })
        .then(data => {
            const account = data.filter(acc => acc._id === id);
            if (account.length === 0) {
                throw new Error();
            }
            res.status(200).json(account);
        })
        .catch(() => {
            res.status(404).json({ message: 'Incorrect id of account!' });
        })
}

const addAccount = (req, res) => {
    Account.create(req.body)
        .then(() => {
            res.status(200).json({ message: 'New account added' });
        })
        .catch(() => {
            res.status(404).json({ message: 'Error occured' });
        })
}

const updateAccount = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.id
        },
        req.body
    ).then(() => {
        res.status(200).json({ message: 'Account updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const deleteAccount = (req, res) => {
    Account.findOneAndDelete(
        {
            userId: req.session.passport.user._id,
            _id: req.params.id
        }
    ).then(() => {
        res.status(200).json({ message: 'Account deleted!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

export {
    getAllAccounts, getAccount,
    addAccount, updateAccount,
    deleteAccount
}