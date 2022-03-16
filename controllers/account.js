import { users } from "../data/users.js";
import { findUser } from "../utils/findUser.js";

const getAllAccounts = (req, res) => {
    const user = findUser(req);
    res.status(200).json(user.accounts);
}

const getAccount = (req, res) => {
    const id = req.params.id;
    const user = findUser(req);
    const account = user.accounts.filter(inc => inc.id === id);

    if (account.length === 0) {
        res.status(404).json({ message: 'Incorrect id of account!' });
    } else {
        res.status(200).json(account);
    }
}

const addAccount = (req, res) => {
    const user = findUser(req);
    users.map(us => {
        if (us._id === user._id) {
            us.accounts.push(req.body);
        }
        return us;
    });

    res.status(200).json({ message: 'New account added', data: users });
}

const updateAccount = (req, res) => {
    const id = +req.params.id;
    const user = findUser(req);
    const index = users.indexOf(user);

    if (index === -1) {
        res.status(404).json({ message: 'Incorrect id of account!' });
    }

    users[index].accounts.splice(id, 1, req.body);

    res.status(200).json({ message: 'Account updated!', data: users });
}

const deleteAccount = (req, res) => {
    const id = +req.params.id;
    const user = findUser(req);
    const index = users.indexOf(user);

    if (index === -1) {
        res.status(404).json({ message: 'Incorrect id of account!' });
    }

    users[index].accounts.splice(id, 1);

    res.status(200).json({ message: 'Account deleted!', data: users });
}

export {
    getAllAccounts, getAccount,
    addAccount, updateAccount,
    deleteAccount
}