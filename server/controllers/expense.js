import Account from '../models/account.js';

const getAllExpenses = (req, res) => {
    Account.findOne(
        {
            userId: req.session.passport.user._id,
            _id: req.params.id
        }
    ).then(data => {
        res.status(200).json(data.transactions.expense);
    }).catch(err => {
        res.status(500).json(err)
    })
}

const getExpense = (req, res) => {
    Account.findOne(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId
        }
    ).then(data => {
        const expense = data.transactions.expense.filter(inc => inc._id === req.params.expenseId);
        if (expense.length === 0) {
            throw new Error();
        }
        res.status(200).json(expense);
    }).catch(() => {
        res.status(404).json({ message: 'Incorrect id of expense!' });
    })
}

const addExpense = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId
        },
        { $push: { "transactions.expense": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'New expense added' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const updateExpense = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId,
            "transactions.expense._id": req.params.expenseId
        },
        { $set: { "transactions.expense.$": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'Expense updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const deleteExpense = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId
        },
        { $pull: { 'transactions.expense': { _id: req.params.expenseId } } }
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