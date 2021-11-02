const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.header('token');

    if(!token) return res.status(401).json({ error: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
}