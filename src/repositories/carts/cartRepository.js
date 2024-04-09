const { Cart } = require('../../models/cart')

module.exports = {
    findCartItemByUserAndProduct: async (userId, productId) => {
        let cartItems = await Cart.findOne({userId: userId, productId: productId});
        if (cartItems) {
            return cartItems.populate('productId');
        }
        return cartItems;
    },
    findCartItemByUser: async (userId) => {
        return await Cart.find({userId: userId});
    },
    addProductToCart: async (data) => {
        return (await Cart.create(data)).populate('productId');
    },
    getUserCartItems: async (userId) => {
        return await Cart.find({userId: userId}).populate('productId')
    },
    deleteCartItems: async (userId) => {
        return await Cart.deleteMany({userId: userId});
    }
}