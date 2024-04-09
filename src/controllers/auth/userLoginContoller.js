const userLoginService = require('../../services/auth/userLoginService');

const login = async (req, res) => {
    return userLoginService.UserLogin(req, res);
}

module.exports.LoginController = login;