import { users } from "../data/users.js";
import { findUser } from "../utils/findUser.js";

const getAllExpenses = (req, res) => {
    const user = findUser(req);
    res.status(200).json(user.transactions.expense);
}

const getExpense = (req, res) => {
    const id = req.params.id;
    const user = findUser(req);
    const expense = user.transactions.expense.filter(inc => inc.id === id);

    if (expense.length === 0) {
        res.status(404).json({ message: 'Incorrect id of expense!' });
    } else {
        res.status(200).json(expense);
    }
}

const addExpense = (req, res) => {
    const user = findUser(req);
    users.map(us => {
        if (us._id === user._id) {
            us.transactions.expense.push(req.body);
        }
        return us;
    });

    res.status(200).json({ message: 'New expense added', data: users });
}

const updateExpense = (req, res) => {
    const id = +req.params.id;
    const user = findUser(req);
    const index = users.indexOf(user);

    if (index === -1) {
        res.status(404).json({ message: 'Incorrect id of  expense!' });
    }

    users[index].transactions.expense.splice(id, 1, req.body);

    res.status(200).json({ message: 'Expense updated!', data: users });
}

const deleteExpense = (req, res) => {
    const id = +req.params.id;
    const user = findUser(req);
    const index = users.indexOf(user);

    if (index === -1) {
        res.status(404).json({ message: 'Incorrect id of expense!' });
    }

    users[index].transactions.expense.splice(id, 1);

    res.status(200).json({ message: 'Expense deleted!', data: users });
}

export {
    getAllExpenses,
    getExpense, addExpense,
    updateExpense, deleteExpense
}