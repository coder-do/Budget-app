import { users } from '../data/users.js';
import { findUser } from '../utils/findUser.js';

const getAllIncomes = (req, res) => {
    const user = findUser(req);
    res.status(200).json(user.transactions.income);
}

const getIncome = (req, res) => {
    const id = req.params.id;
    const user = findUser(req);
    const income = user.transactions.income.filter(inc => inc.id === id);

    if (income.length === 0) {
        res.status(404).json({ message: 'Incorrect id of income!' });
    } else {
        res.status(200).json(income);
    }
}

const addIncome = (req, res) => {
    const user = findUser(req);
    users.map(us => {
        if (us._id === user._id) {
            us.transactions.income.push(req.body);
        }
        return us;
    });

    res.status(200).json({ message: 'New income added', data: users });
}

const updateIncome = (req, res) => {
    const id = +req.params.id;
    const user = findUser(req);
    const index = users.indexOf(user);

    if (index === -1) {
        res.status(404).json({ message: 'Incorrect id of  income!' });
    }

    users[index].transactions.income.splice(id, 1, req.body);

    res.status(200).json({ message: 'Income updated!', data: users });
}

const deleteIncome = (req, res) => {
    const id = +req.params.id;
    const user = findUser(req);
    const index = users.indexOf(user);

    if (index === -1) {
        res.status(404).json({ message: 'Incorrect id of user or income!' });
    }

    users[index].transactions.income.splice(id, 1);

    res.status(200).json({ message: 'Income deleted!', data: users });
}

export {
    getAllIncomes, getIncome,
    addIncome, updateIncome,
    deleteIncome
}