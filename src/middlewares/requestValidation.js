const validation = require('express-validator');

const reqValidate = (req, res, next) => {
    const errors = validation.validationResult(req);
    if (!errors.isEmpty()) {
        let errorArray = errors.array();
        return res.status(422).json({
            success: false,
            messge: `Found the request as invalid because of ${errorArray[0].msg}`
        })
    } else {
        next();
    }
}

module.exports.ReqValidate = reqValidate;