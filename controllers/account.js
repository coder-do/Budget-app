import User from "../models/user.js";

const getAllAccounts = (req, res) => {
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            res.status(200).json(data.accounts);
        })
}

const getAccount = (req, res) => {
    const id = req.params.id;
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            const account = data.accounts.filter(acc => acc.id === id);
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
    User.findOneAndUpdate(
        { email: req.session.passport.user.email },
        { $push: { "accounts": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'New account added' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const updateAccount = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email,
            "accounts.id": req.params.id
        },
        { $set: { "accounts.$": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'Account updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const deleteAccount = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email
        },
        { $pull: { 'accounts': { id: req.params.id } } }
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