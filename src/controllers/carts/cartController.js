const cartService = require('../../services/carts/cartService');

const addToCart = async (req, res) => {
    try {
        // make a call to add items to cart.
        let cart = await cartService.addToCart(req);
        res.status(201).json({
            success: true,
            message: "Items added to cart successfully",
            data: cart
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const viewCart = async (req, res) => {
    try {
        // get the cart details as requested by the user.
        let cart = await cartService.viewCart(req);
        res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cart
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {addToCart, viewCart}