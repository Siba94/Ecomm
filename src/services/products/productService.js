const productRepo = require('../../repositories/products/productRepository');
const categoryRepo = require('../../repositories/categories/categoryRepository');
const { isEmpty } = require('../../utils/globalUtility');

const createProduct = async(req) => {
    return new Promise (async (resolve, reject) => {
        try {
            // check the category details before creating product.
            let category = await categoryRepo.findById(req.params.categoryId);
            if (isEmpty(category)) {
                reject({
                    success: false,
                    message: 'The provided category is not available to create product.'
                })
            }
            // create the product.
            let createdProduct = await productRepo.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categoryId: category._id
            });

            if (createdProduct._id) {
                return resolve(createdProduct);
            }
            reject({
                success: false,
                message: 'Product creation failed.',
                data: null
            });
        } catch (error) {
            console.log(error);
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const listAllProducts = async() => {
    return new Promise (async (resolve, reject) => {
        try {
            // list all products irrespective of categories.
            let products = await productRepo.findAll();

            if (isEmpty(products)) {
                reject({
                    success: false,
                    message: "Products are not available. Please create a product.",
                    data: null
                })
            }
            return resolve(products);
        } catch (error) {
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const productDetails = async(req) => {
    return new Promise (async (resolve, reject) => {
        try {
            // get product details based on prodcut id.
            let product = await productRepo.findOneBy(req.params.productId);

            if (isEmpty(product)) {
                reject({
                    success: false,
                    message: "Products are not available. Please create a product.",
                    data: null
                })
            }
            return resolve(product);
        } catch (error) {
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const productBasedOnCategory = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            // get product list based on category.
            let products = await productRepo.findAllByCategory(req.params.categoryId);

            if (isEmpty(products)) {
                reject({
                    success: false,
                    message: "Products are not available for this category. Please create a product.",
                    data: null
                })
            }
            return resolve(products);
        } catch (error) {
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = { createProduct, listAllProducts, productDetails, productBasedOnCategory}