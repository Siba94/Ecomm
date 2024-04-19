const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require ('../../middlewares/requestValidation');
const { authenticateToken, isUserAuthorized} = require('../../middlewares/authenticateJwt');
const { createProduct,listAllProducts, productDetails, productBasedOnCategory } = require('../../controllers/products/productController');
const {ROLES_ALLOWED} = require('../../constants/constant')

router.post('/category/:categoryId/product', 
    [
        body('name')
            .notEmpty()
            .withMessage('product name can not be empty'),
        body('description'),
        body('price'),
    ],
    authenticateToken,
    isUserAuthorized(ROLES_ALLOWED.ADMIN),
    reqValidate,
    createProduct
);

router.get('/all-products', 
    [],
    authenticateToken,
    reqValidate,
    listAllProducts
);

router.get('/product/:productId', [], reqValidate, productDetails);
router.get('/category/:categoryId/products', [], reqValidate, productBasedOnCategory);

module.exports = router