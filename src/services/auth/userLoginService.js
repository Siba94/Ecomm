const userRepo = require('../../repositories/users/userRepository');
const { error } = require("../../utils/error");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * this helps us for user login
 * @param {*} email 
 * @param {*} password 
 * @returns {string | object}
 */
const userLogin = async (email, password) => {
    try {
        let user = await userRepo.findByEmail(email);
        if (user) {
            let isValidPassword = bcrypt.compareSync(password, user.password);
            if (isValidPassword) {
                let jwtToken = generateJwtToken({
                    id: user._id,
                    username: user.name, 
                    email: user.email, 
                    role: user.role
                })
                return jwtToken;
            }
            throw { 
                status: error.INVALID_PASSWORD.status,
                message: error.INVALID_PASSWORD.message
            }
        }
        throw {
            status: error.USER_NOT_FOUND.status,
            message: error.USER_NOT_FOUND.message
        }
    } catch (error) {
        throw error;
    }
}

function generateJwtToken (username) {
    try {
        return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: "24h"})
    } catch (error) {
        throw error;
    }
}

module.exports = { userLogin }
