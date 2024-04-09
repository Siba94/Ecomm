const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require('../../middlewares/requestValidation');
const { authenticateToken } = require('../../middlewares/authenticateJwt');
const { createCategory, updateCategory, activateCategory, deActivateCategory, getAllCategories } = require('../../controllers/categories/categoryController');

router.post('/category', 
    [
        body('name')
            .notEmpty()
            .withMessage('name can not be empty.')
            .isString()
            .withMessage('name should be a string.'),
        
        body('description'),
    ],
    authenticateToken,
    reqValidate,
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
    authenticateToken,
    reqValidate,
    updateCategory
)

router.patch('/category/:categoryId/activate', 
    [],
    authenticateToken,
    reqValidate,
    activateCategory
)

router.patch('/category/:categoryId/de-activate', 
    [],
    authenticateToken,
    reqValidate,
    deActivateCategory
)

router.get('/category', 
    [],
    reqValidate,
    getAllCategories
)

module.exports = router