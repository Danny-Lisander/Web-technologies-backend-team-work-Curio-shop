const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    const token = req.cookies.curio_access_token;
    if (!token || token === 'undefined' || token === 'NaN') {
        req.userId = 0;
        req.userRole = 0;
        return next()
    }
    try {
        const data = jwt.verify(token, secret);
        req.userId = data.id;
        req.userRole = data.roles;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};