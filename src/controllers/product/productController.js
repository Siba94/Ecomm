const productService = require('../../services/product/product');

const createProduct = async (req, res) => {
    try {
        let createdProduct = await productService.createProduct(req);
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: createdProduct
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const listAllProducts = async (req, res) => {
    try {
        let products = await productService.listAllProducts();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const productDetails = async (req, res) => {
    try {
        let product = await productService.productDetails(req);
        res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const productBasedOnCategory = async (req, res) => {
    try {
        let product = await productService.productBasedOnCategory(req);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {createProduct, listAllProducts, productDetails, productBasedOnCategory}
