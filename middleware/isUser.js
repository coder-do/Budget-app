export const isUser = (req, res, next) => {
    const role = req.session && req.session.passport.user.role;
    if (role === 'admin') {
        return next();
    }
    if (role !== 'user') {
        res.status(403).json({ message: 'Not authorized!!!' });
        return;
    };
    next();
};