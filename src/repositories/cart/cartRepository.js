const { Cart } = require('../../models/cart')

module.exports = {
    findCartItemByUserAndProduct: async (userId, productId) => {
        return (await Cart.findOne({userId: userId, productId: productId}))
            .populate('productId')
        ;
    },
    findCartItemByUser: async (userId) => {
        return await Cart.find({userId: userId});
    },
    addProductToCart: async (data) => {
        return (await Cart.create(data)).populate('productId');
    },
    getUserCartItems: async (userId) => {
        return await Cart.find({userId: userId}).populate('productId')
    }
}