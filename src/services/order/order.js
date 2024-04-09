const mongoose = require('mongoose')
const orderRepo = require('../../repositories/order/orderRepository');
const cartRepo = require('../../repositories/cart/cartRepository');
const { OrderItem } = require('../../models/orderItem');

const createOrder = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login for placing an order.",
                    data: null
                })
            }
            let user = req.user;
            let userId = new mongoose.Types.ObjectId(user.id);
            // find the itmes available in the cart to place an order.
            let cartItems = await cartRepo.findCartItemByUser(userId);
            let orderItems = cartItems.map(eachItem => ({
                userId: eachItem.userId,
                productId: eachItem.productId,
                quantity: eachItem.quantity,
                unitPrice: eachItem.unitPrice
            }));
            
            let totalPrice = cartItems.reduce((price, item) => price + (item.quantity * item.unitPrice), 0);
            let totalQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity , 0);

            let createdOrderedItems = await OrderItem.insertMany(orderItems);
            let createdOrder = await orderRepo.createAnOrder({
                userId: userId,
                orderItems: createdOrderedItems,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            });
            return resolve(createdOrder);

        } catch (error) {
            console.log(error)
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const getOrderDetails = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login to see your orders.",
                    data: null
                })
            }
            let orderDetails = await orderRepo.getOrderDeatils(req.params.orderId)
            return resolve(orderDetails);
        } catch (error) {
            console.log(error)
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const getOrdersByDate = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login to see your orders.",
                    data: null
                })
            }
            let orderDetails = await orderRepo.findOrdersFromSpecificPeriod(req.body.fromDate, req.body.toDate);
            return resolve(orderDetails);
        } catch (error) {
            console.log(error)
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = {createOrder, getOrderDetails, getOrdersByDate}