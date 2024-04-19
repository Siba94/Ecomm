const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require('../../middlewares/requestValidation');
const { authenticateToken, isUserAuthorized } = require('../../middlewares/authenticateJwt');
const { createCategory, updateCategory, activateCategory, deActivateCategory, getAllCategories } = require('../../controllers/categories/categoryController');
const {ROLES_ALLOWED} = require('../../constants/constant')

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
    isUserAuthorized(ROLES_ALLOWED.ADMIN),
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
    isUserAuthorized(ROLES_ALLOWED.ADMIN),
    reqValidate,
    updateCategory
)

router.patch('/category/:categoryId/activate', 
    [],
    authenticateToken,
    isUserAuthorized(ROLES_ALLOWED.ADMIN),
    reqValidate,
    activateCategory
)

router.patch('/category/:categoryId/de-activate', 
    [],
    authenticateToken,
    isUserAuthorized(ROLES_ALLOWED.ADMIN),
    reqValidate,
    deActivateCategory
)

router.get('/category', 
    [],
    reqValidate,
    getAllCategories
)

module.exports = router