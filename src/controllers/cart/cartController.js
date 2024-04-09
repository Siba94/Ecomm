const cartService = require('../../services/cart/cart');

const addToCart = async (req, res) => {
    try {
        let cart = await cartService.addToCart(req);
        res.status(201).json({
            success: true,
            message: "Items added to cart successfully",
            data: cart
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const viewCart = async (req, res) => {
    try {
        let cart = await cartService.viewCart(req);
        res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cart
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {addToCart, viewCart}