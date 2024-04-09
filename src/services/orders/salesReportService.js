const orderRepo = require('../../repositories/orders/orderRepository');
const { isEmpty } = require('../../utils/globalUtility')

const getSalesReport = async (req) => {
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
            // req.body.fromDate = '2024-04-09';
            // req.body.toDate = '2024-04-10'
            // get orders filter by created date in desc order.
            let orderDetails = await orderRepo.findOrdersFromSpecificPeriod(req.body.fromDate, req.body.toDate);
            if (isEmpty(orderDetails)) {
                reject({
                    success: false,
                    message: "could not find any order for the specified time period",
                    data: null
                })
            }
            return resolve(orderDetails);
        } catch (error) {
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = {getSalesReport}