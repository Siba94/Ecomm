const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require ('../../middlewares/requestValidation');
const { authenticateToken } = require('../../middlewares/authenticateJwt');
const { addToCart, viewCart } = require('../../controllers/carts/cartController');

router.post('/cart', 
    [
        body('productId')
        .notEmpty()
        .withMessage('product details can not be empty'),

        body('quantity')
        .notEmpty()
        .withMessage('quantity can not be empty')
    ],
    authenticateToken,
    reqValidate,
    addToCart
)

router.get('/cart', [], authenticateToken, reqValidate, viewCart)

module.exports = router