const productRepo = require('../../repositories/product/productRepository');
const categoryRepo = require('../../repositories/category/categoryRepository');

const createProduct = async(req) => {
    return new Promise (async (resolve, reject) => {
        try {
            let category = await categoryRepo.findById(req.params.categoryId);
            console.log(category);
            if (isEmpty(category)) {
                reject({
                    success: false,
                    message: 'The provided category is not available to create product.'
                })
            }

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

function isEmpty(value) {
    return value && Object.keys(value).length === 0;
}

module.exports = { createProduct, listAllProducts, productDetails, productBasedOnCategory}