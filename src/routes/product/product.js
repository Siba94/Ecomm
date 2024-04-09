const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { ReqValidate } = require ('../../middlewares/requestValidation');
const { AuthenticateToken } = require('../../middlewares/authenticateJwt');
const { createProduct,listAllProducts, productDetails, productBasedOnCategory } = require('../../controllers/product/productController');

router.post('/category/:categoryId/product', 
    [
        body('name')
            .notEmpty()
            .withMessage('product name can not be empty'),
        body('description'),
        body('price'),
    ],
    AuthenticateToken,
    ReqValidate,
    createProduct
);

router.get('/all-products', 
    [],
    AuthenticateToken,
    ReqValidate,
    listAllProducts
);

router.get('/product/:productId', [], ReqValidate, productDetails);
router.get('/category/:categoryId/products', [], ReqValidate, productBasedOnCategory);

module.exports = router