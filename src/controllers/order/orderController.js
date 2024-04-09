const orderService = require('../../services/order/order');

const createOrder = async (req, res) => {
    try {
        let order = await orderService.createOrder(req);
        res.status(201).json({
            success: true,
            message: "order created successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const getOrderDetails = async (req, res) => {
    try {
        let order = await orderService.orderDetails(req);
        res.status(200).json({
            success: true,
            message: "order fetched successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {createOrder, getOrderDetails}