const mongoose = require('mongoose')
const orderRepo = require('../../repositories/orders/orderRepository');
const cartRepo = require('../../repositories/carts/cartRepository');
const { OrderItem } = require('../../models/orderItem');

const createOrder = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            // check the req object for user id.
            // if not found that means user is not logged in. 
            // we store user id with the token and then transfer that to request object.
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login for placing an order.",
                    data: null
                })
            }
            let user = req.user;
            // convert user id string to object.
            let userId = new mongoose.Types.ObjectId(user.id);
            // find the itmes available in the cart to place an order.
            let cartItems = await cartRepo.findCartItemByUser(userId);
            let orderItems = cartItems.map(eachItem => ({
                userId: eachItem.userId,
                productId: eachItem.productId,
                quantity: eachItem.quantity,
                unitPrice: eachItem.unitPrice
            }));
            // calculate total price and quantity for order based on the cart item quantity and unit price of product.
            let totalPrice = cartItems.reduce((price, item) => price + (item.quantity * item.unitPrice), 0);
            let totalQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity , 0);

            // push all the cart items to order itmes collection.
            let createdOrderedItems = await OrderItem.insertMany(orderItems);
            // create an order document.
            let createdOrder = await orderRepo.createAnOrder({
                userId: userId,
                orderItems: createdOrderedItems,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            });
            // delete all the cart items after creating order.
            cartRepo.deleteCartItems(userId);
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
            // check the req object for user id.
            // if not found that means user is not logged in. 
            // we store user id with the token and then transfer that to request object.
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login to see your orders.",
                    data: null
                })
            }
            // get specific order details based on order id.
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
            // check the req object for user id.
            // if not found that means user is not logged in. 
            // we store user id with the token and then transfer that to request object.
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login to see your orders.",
                    data: null
                })
            }
            // get orders filter by created date in desc order.
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