import User from "../models/user.js";

const getAllExpenses = (req, res) => {
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            res.status(200).json(data.transactions.expense);
        })
}

const getExpense = (req, res) => {
    const id = req.params.id;
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            const expense = data.transactions.expense.filter(exp => exp.id === id);
            if (expense.length === 0) {
                throw new Error();
            }
            res.status(200).json(expense);
        })
        .catch(() => {
            res.status(404).json({ message: 'Incorrect id of expense!' });
        })
}

const addExpense = (req, res) => {
    User.findOneAndUpdate(
        { email: req.session.passport.user.email },
        { $push: { "transactions.expense": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'New expense added' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const updateExpense = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email,
            "transactions.expense.id": req.params.id
        },
        { $set: { "transactions.expense.$": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'Expense updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const deleteExpense = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email
        },
        { $pull: { 'transactions.expense': { id: req.params.id } } }
    ).then(() => {
        res.status(200).json({ message: 'Expense deleted!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

export {
    getAllExpenses,
    getExpense, addExpense,
    updateExpense, deleteExpense
}