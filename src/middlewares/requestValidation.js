const validation = require('express-validator');
const { apiResponse } = require('../utils/apiResponse');

const reqValidate = (req, res, next) => {
    const errors = validation.validationResult(req);
    if (!errors.isEmpty()) {
        let errorArray = errors.array();
        return res.status(400)
            .json(apiResponse(false, `Found the request as invalid because of ${errorArray[0].msg}`))
    } else {
        next();
    }
}

module.exports.reqValidate = reqValidate;