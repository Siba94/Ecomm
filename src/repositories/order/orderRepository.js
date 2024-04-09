const { Order } = require('../../models/order')
const { OrderItems } = require('../../models/orderItem')

module.exports = {
    createAnOrder: async (data) => {
        return (await Order.create(data)).populate('orderItems');
    },
    getOrderDeatils: async (orderId) => {
        return (await Order.findOne({_id: orderId})).populate('orderItems');
    }
}