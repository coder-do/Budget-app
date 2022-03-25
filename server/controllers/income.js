import Account from '../models/account.js';

const getAllIncomes = (req, res) => {
    Account.findOne(
        {
            userId: req.session.passport.user._id,
            _id: req.params.id
        }
    ).then(data => {
        res.status(200).json(data.transactions.income);
    }).catch(err => {
        res.status(500).json(err)
    })
}

const getIncome = (req, res) => {
    Account.findOne(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId
        }
    ).then(data => {
        const income = data.transactions.income.filter(inc => inc._id === req.params.incomeId);
        if (income.length === 0) {
            throw new Error();
        }
        res.status(200).json(income);
    }).catch(() => {
        res.status(404).json({ message: 'Incorrect id of income!' });
    })
}

const addIncome = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId
        },
        { $push: { "transactions.income": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'New income added' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const updateIncome = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId,
            "transactions.income._id": req.params.incomeId
        },
        { $set: { "transactions.income.$": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'Income updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

const deleteIncome = (req, res) => {
    Account.findOneAndUpdate(
        {
            userId: req.session.passport.user._id,
            _id: req.params.accountId
        },
        { $pull: { 'transactions.income': { _id: req.params.incomeId } } }
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