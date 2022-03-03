const login = (req, res) => {
    res.status(200).json({ message: 'Login completed', data: req.body })
}

const logout = (req, res) => {
    res.status(200).json({ message: 'Logout completed' })
}

export { login, logout }