const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require ('../../middlewares/requestValidation');
const { authenticateToken } = require('../../middlewares/authenticateJwt');
const { generateSalesReport } = require('../../controllers/orders/salesReportController');

router.get('/sales-report', 
    [],
    authenticateToken,
    reqValidate,
    generateSalesReport
)

module.exports = router