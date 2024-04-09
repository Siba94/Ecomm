const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { ReqValidate } = require ('../../middlewares/requestValidation');
const { AuthenticateToken } = require('../../middlewares/authenticateJwt');
const { addToCart, viewCart } = require('../../controllers/cart/cartController');

router.post('/cart', 
    [
        body('productId')
        .notEmpty()
        .withMessage('product details can not be empty'),

        body('quantity')
        .notEmpty()
        .withMessage('quantity can not be empty')
    ],
    AuthenticateToken,
    ReqValidate,
    addToCart
)

router.get('/cart', [], AuthenticateToken, ReqValidate, viewCart)

module.exports = router