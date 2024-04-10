const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { reqValidate } = require ('../../middlewares/requestValidation');
const { authenticateToken, isUserAuthorized } = require('../../middlewares/authenticateJwt');
const { generateSalesReport } = require('../../controllers/orders/salesReportController');
const {ROLES_ALLOWED} = require('../../config/constant')

router.get('/sales-report', 
    [],
    authenticateToken,
    isUserAuthorized(ROLES_ALLOWED.ADMIN),
    reqValidate,
    generateSalesReport
)

module.exports = router