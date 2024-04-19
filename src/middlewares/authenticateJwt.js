const jwt = require('jsonwebtoken');
const { apiResponse } = require('../utils/apiResponse');
const { error } = require('../utils/error');

const authenticateToken = (req, res, next) => {
    // get the token from request header.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // return 400 error response saying token is not provided, if token is not there
    if (token == null) {
        return res.status(error.TOKEN_NOT_FOUND.status)
            .json(apiResponse(false, error.TOKEN_NOT_FOUND.message));
    
    }
        
    // verify the provided token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {
            return res.status(error.INVALID_TOKEN.status)
                .json(apiResponse(false, error.INVALID_TOKEN.message));
        }
        req.user = user;
        next();
    })
}

const isUserAuthorized = (roles) => {
    return (req, res, next) => {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }
    
        if (roles.indexOf(req.user.role) === -1) {
            return res.status(error.ACCESS_NOT_ALLOWED.status)
                .json(apiResponse(false, error.ACCESS_NOT_ALLOWED.message))
        }
        next();
    }
}


module.exports = {authenticateToken, isUserAuthorized}