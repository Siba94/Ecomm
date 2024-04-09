const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { ReqValidate } = require('../../middlewares/requestValidation.js')
const { RegisterController } = require('../../controllers/auth/userRegistrationController.js');

router.post('/register', 
    [
        body('name')
            .notEmpty()
            .withMessage('name should be available to process further.')    
            .isString()
            .withMessage('the provided name is invalid to use.')
            .isLength({min: 3, max: 100})
            .withMessage('name must be at least 3 chars long.'),
        
        body('email')
            .notEmpty()
            .withMessage('Email should be required.')
            .isEmail()
            .isLength({min: 10, max: 255})
            .withMessage('email must be at least 10 chars long.'),
        
        body('password')
            .notEmpty()
            .withMessage('Password can not be empty.')
            .isString()
            .isLength({min: 8, max: 50})
            .withMessage('password must be at least 8 chars long.'),

    ],
    ReqValidate,
    RegisterController
)

module.exports = router