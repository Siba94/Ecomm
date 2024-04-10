const userRegistrationService = require('../../services/auth/userRegistrationService');
const jwt = require('jsonwebtoken');
const {JWT_EXPIRE_TIME} = require('../../config/constant')

const registerUser = async (req, res) => {
    try {
        // try to register the user based on the user details.
        let user = await userRegistrationService.userRegister(req);
        res.status(201).json({
            success: true,
            message: "User created successfully ",
            data: generateJwtToken({
                id: user._id,
                username: user.name, 
                email: user.email, 
                role: user.role
            })
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
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME})
}

module.exports = { registerUser }