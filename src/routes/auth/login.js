const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { ReqValidate } = require('../../middlewares/requestValidation.js')
const { LoginController } = require('../../controllers/auth/userLoginContoller.js');

router.post('/login', 
    [
        body('email')
            .notEmpty()
            .withMessage('Email should be required.')
            .isEmail()
            .isLength({min: 10, max: 255})
            .withMessage('email must be at least 10 chars long.'),
        
        body('password')
            .notEmpty()
            .withMessage('Password can not be empty.')
            .isString(),

    ],
    ReqValidate,
    LoginController
)

module.exports = router