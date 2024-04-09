const jwt = require('jsonwebtoken');

function authenticateToken (req, res, next) {
    // get the token from request header.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // return 400 error response saying token is not provided, if token is not there
    if (token == null) return res.status(400).json({
        success: false,
        message: 'Unable to find the authorization token',
        data: null
    });
    
    // verify the provided token
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

module.exports.authenticateToken = authenticateToken;