export const isAdmin = (req, res, next) => {
    const role = req.session && req.session.role;
    if (role !== 'admin' && role === 'user') {
        res.status(403).json({ message: 'User can not access admin resources' });
        return;
    };
    if (role !== 'admin') {
        res.status(403).json({ message: 'Not authenticated!!!' });
        return;
    };
    next();
};