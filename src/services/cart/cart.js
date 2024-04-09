const mongoose = require('mongoose')
const { User } = require('../../models/user')
const cartRepo = require('../../repositories/cart/cartRepository')
const productRepo = require('../../repositories/product/productRepository')

const addToCart = async(req) => {
    return new Promise (async (resolve, reject) => {
        try {
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login for adding items to cart.",
                    data: null
                })
            }
            let user = req.user;
            const { productId, quantity } = req.body;
            let product = await productRepo.findOneBy(productId);
            if (isEmpty(product)) {
                reject({
                    success: false,
                    message: "Please provide a valid product.",
                    data: null
                })
            }
            let userId = new mongoose.Types.ObjectId(user.id);
            let expectedOrderItem = await cartRepo
                .findCartItemByUserAndProduct(userId, product._id);
            if (!expectedOrderItem) {
                expectedOrderItem = cartRepo.addProductToCart({
                    userId: user.id,
                    productId: product._id,
                    quantity: quantity,
                    unitPrice: product.price
                });
            }
            if (expectedOrderItem._id) {
                return resolve(expectedOrderItem);
            }
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

const viewCart = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            if (isEmpty(req.user)) {
                reject({
                    success: false,
                    message: "Please login for adding items to cart.",
                    data: null
                })
            }
            let user = req.user;
            let userId = new mongoose.Types.ObjectId(user.id);
            let cart = await cartRepo.getUserCartItems(userId);
            console.log(cart, isEmpty(cart));
            if (!isEmpty(cart)) {
                return resolve(cart);
            } else {
                reject({
                    success: false,
                    message: "This cart is empty. Please add items to your cart.",
                    data: null
                })
            }

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

function isEmpty(value) {
    return value && Object.keys(value).length === 0;
}

module.exports = {addToCart, viewCart};