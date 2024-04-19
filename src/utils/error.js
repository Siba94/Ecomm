const error = {
    USER_NOT_FOUND: {status: 404, message: "We are not able to find any user with the requested data. Plese check and try again."},
    INVALID_PASSWORD: {status: 400, message: "The requested password seems to be incorrect. Please check and try again."},
    TOKEN_NOT_FOUND: {status: 400, message: "Unable to find the authorization token"},
    INVALID_TOKEN: {status: 401, message: "The token seems to be invalid. Please login and try again."},
    ACCESS_NOT_ALLOWED: {status: 403, message: "You are not allowed for the requested operation."},
    USER_EXIST: {status: 422, message: "The user already exist with this requested email address. Please try to login."},

}

module.exports = {error}