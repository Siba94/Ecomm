const { apiResponse } = require("../utils/apiResponse")

const handleUnexpectedError = (err, req, res, next) => {
    return res.status(500).json(apiResponse(false, "Something went wrong!!"));
}


module.exports = {handleUnexpectedError}