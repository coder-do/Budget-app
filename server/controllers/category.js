import User from "../models/user.js";

const getAllCategories = (req, res) => {
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            res.status(200).json(data.categories);
        })
}

const updateCategories = (req, res) => {
    User.findOneAndUpdate(
        {
            email: req.session.passport.user.email
        },
        { $set: { "categories": req.body } }
    ).then(() => {
        res.status(200).json({ message: 'Categories updated!' });
    }).catch(() => {
        res.status(404).json({ message: 'Error occured' });
    })
}

export { getAllCategories, updateCategories }