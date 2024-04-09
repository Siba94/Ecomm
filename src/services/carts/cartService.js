const mongoose = require('mongoose')
const { User } = require('../../models/user')
const cartRepo = require('../../repositories/carts/cartRepository')
const productRepo = require('../../repositories/products/productRepository')

const addToCart = async(req) => {
    return new Promise (async (resolve, reject) => {
        try {
            // check the req object for user id.
            // if not found that means user is not logged in. 
            // we store user id with the token and then transfer that to request object.
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login for adding items to cart.",
                    data: null
                })
            }
            let user = req.user;
            const { productId, quantity } = req.body;
            // check the product existence.
            let product = await productRepo.findOneBy(productId);
            if (!product) {
                reject({
                    success: false,
                    message: "Please provide a valid product.",
                    data: null
                })
            }
            // conver the user id string to object id before making a call to save the details further.
            let userId = new mongoose.Types.ObjectId(user.id);
            // check whether the product is already there in the cart or not.
            // if the product is already there do nothing else add the product to cart.
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
            // check the req object for user id.
            // if not found that means user is not logged in. 
            // we store user id with the token and then transfer that to request object.
            if (!req.user) {
                reject({
                    success: false,
                    message: "Please login for adding items to cart.",
                    data: null
                })
            }
            let user = req.user;
            // conver the user id string to object id before making a call to save the details further.
            let userId = new mongoose.Types.ObjectId(user.id);
            // get the user cart items.
            let cart = await cartRepo.getUserCartItems(userId);
            if (cart) {
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

module.exports = {addToCart, viewCart};