const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require ('../../middlewares/requestValidation');
const { authenticateToken } = require('../../middlewares/authenticateJwt');
const { createOrder, getOrderDetails, getOrdersByDate } = require('../../controllers/orders/orderController');

router.post('/order', 
    [],
    authenticateToken,
    reqValidate,
    createOrder
)

router.get('/order/:orderId', [], authenticateToken, reqValidate, getOrderDetails)
router.get('/order', [], authenticateToken, reqValidate, getOrdersByDate)

module.exports = router