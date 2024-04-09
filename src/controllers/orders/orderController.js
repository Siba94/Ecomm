const orderService = require('../../services/orders/orderService');

const createOrder = async (req, res) => {
    try {
        // create the requested order.
        let order = await orderService.createOrder(req);
        res.status(201).json({
            success: true,
            message: "order created successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const getOrderDetails = async (req, res) => {
    try {
        // get a specific order details based on order id.
        let order = await orderService.getOrderDetails(req);
        res.status(200).json({
            success: true,
            message: "order fetched successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const getOrdersByDate = async (req, res) => {
    try {
        // get orders filter by date.
        let order = await orderService.getOrdersByDate(req);
        res.status(200).json({
            success: true,
            message: "order fetched successfully",
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {createOrder, getOrderDetails, getOrdersByDate}