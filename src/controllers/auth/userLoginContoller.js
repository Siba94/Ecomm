const userLoginService = require('../../services/auth/userLoginService');
const { success } = require("../../utils/success");
const { apiResponse } = require("../../utils/apiResponse");

const login = async (req, res) => {

    try {
        // try for the user login service.
        let userToken = await userLoginService
            .userLogin(
                req.body.email, 
                req.body.password
            );
        res.status(success.USER_LOGGEDIN.status)
            .json(
                apiResponse(
                    true,
                    success.USER_LOGGEDIN.message,
                    userToken
                )
            )
    } catch (error) {
        res.status(error.status)
            .json(
                apiResponse(
                    false,
                    error.message
                )
            )
    }
}

module.exports = { login }