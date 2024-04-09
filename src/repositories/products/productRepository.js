const { Product } = require('../../models/product')

module.exports = {
    create: async (data) => {
        return (await Product.create(data)).populate('categoryId');
    },
    findAll: async () => {
        return await (Product.find()).populate('categoryId');
    },
    findAllByCategory: async (categoryId) => {
        return await (Product.find({categoryId: categoryId})).populate('categoryId');
    },
    findOneBy: async (productId) => {
        return await (Product.findOne({_id: productId})).populate('categoryId');
    }
}