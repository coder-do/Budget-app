import User from '../models/user.js';

const getAllIncomes = (req, res) => {
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            res.status(200).json(data.transactions.income);
        })
}

const getIncome = (req, res) => {
    const id = req.params.id;
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            const income = data.transactions.income.filter(inc => inc.id === id);
            if (income.length === 0) {
                throw new Error();
            }
            res.status(200).json(income);
        })
        .catch(() => {
            res.status(404).json({ message: 'Incorrect id of income!' });
        })
}

const addIncome = (req, res) => {
    User.findOneAndUpdate(
        { email: req.session.passport.user.email },
        { $push: { "transactions.income": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'New income added' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const updateIncome = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email,
            "transactions.income.id": req.params.id
        },
        { $set: { "transactions.income.$": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'Income updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const deleteIncome = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email
        },
        { $pull: { 'transactions.income': { id: req.params.id } } }
    ).then(() => {
        res.status(200).json({ message: 'Income deleted!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

export {
    getAllIncomes, getIncome,
    addIncome, updateIncome,
    deleteIncome
}