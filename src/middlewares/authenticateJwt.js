const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.json({
        success: false,
        message: 'Unable to find the authorization token',
        data: null
    });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return res.status(403).json({
            success: false,
            message: err.message,
            data: null
        });
        req.user = user;
        next();
    })
}

module.exports.AuthenticateToken = authenticateToken;