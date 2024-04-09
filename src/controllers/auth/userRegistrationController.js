const userRegistrationService = require('../../services/auth/userRegistrationService');

const registerUser = async (req, res) => {
    return userRegistrationService.UserRegister(req, res);
}

module.exports.RegisterController = registerUser;