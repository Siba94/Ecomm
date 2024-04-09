const userRegistrationService = require('../../services/auth/userRegistrationService');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        // try to register the user based on the user details.
        let user = await userRegistrationService.userRegister(req);
        res.status(201).json({
            success: true,
            message: "User created successfully ",
            data: generateJwtToken({username: user.name, email: user.email, id: user._id})
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

module.exports = { registerUser }