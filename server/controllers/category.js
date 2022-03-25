import User from "../models/user.js";

const getAllCategories = (req, res) => {
    User.findOne({ email: req.session.passport.user.email })
        .then(data => {
            res.status(200).json(data.categories);
        })
}

export { getAllCategories }