const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { ReqValidate } = require('../../middlewares/requestValidation');
const { AuthenticateToken } = require('../../middlewares/authenticateJwt');
const { createCategory, updateCategory, activateCategory, deActivateCategory, getAllCategories } = require('../../controllers/category/categoryController');

router.post('/category', 
    [
        body('name')
            .notEmpty()
            .withMessage('name can not be empty.')
            .isString()
            .withMessage('name should be a string.'),
        
        body('description'),
    ],
    AuthenticateToken,
    ReqValidate,
    createCategory
);

router.patch('/category/:categoryId', 
    [
        body('name')
            .notEmpty()
            .withMessage('name can not be empty.')
            .isString()
            .withMessage('name should be a string.'),
        
        body('description'),
    ],
    AuthenticateToken,
    ReqValidate,
    updateCategory
)

router.patch('/category/:categoryId/activate', 
    [],
    AuthenticateToken,
    ReqValidate,
    activateCategory
)

router.patch('/category/:categoryId/de-activate', 
    [],
    AuthenticateToken,
    ReqValidate,
    deActivateCategory
)

router.get('/category', 
    [],
    ReqValidate,
    getAllCategories
)

module.exports = router