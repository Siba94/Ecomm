const userLoginService = require('../../services/auth/userLoginService');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        // try for the user login service.
        let user = await userLoginService.userLogin(req);
        res.status(200).json({
            success: true,
            message: "successfully loggedIn",
            data: generateJwtToken({username: user.name, email:user.email, id: user._id})
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

function generateJwtToken (username) {
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '24h'})
}

module.exports = { login }