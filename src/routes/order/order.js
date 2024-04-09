const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { ReqValidate } = require ('../../middlewares/requestValidation');
const { AuthenticateToken } = require('../../middlewares/authenticateJwt');
const { createOrder, getOrderDetails, getOrdersByDate } = require('../../controllers/order/orderController');

router.post('/order', 
    [],
    AuthenticateToken,
    ReqValidate,
    createOrder
)

router.get('/order/:orderId', [], AuthenticateToken, ReqValidate, getOrderDetails)
router.get('/order', [], AuthenticateToken, ReqValidate, getOrdersByDate)

module.exports = router