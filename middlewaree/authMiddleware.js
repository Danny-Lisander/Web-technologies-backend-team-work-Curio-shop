const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
const UserController = require('../controllers/UserController')

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    const token = req.cookies.curio_access_token;
    if (!token) {
        return next()
    }
    try {
        const data = jwt.verify(token, secret);
        req.userId = data.id;
        req.userRole = data.role;
        UserController.logOUT(req, res);
        return next();
    } catch {
        return res.sendStatus(403);
    }
};