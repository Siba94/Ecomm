const productService = require('../../services/products/productService');

const createProduct = async (req, res) => {
    try {
        // create product.
        let createdProduct = await productService.createProduct(req);
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: createdProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const listAllProducts = async (req, res) => {
    try {
        // list all the products irrespective of their categries.
        let products = await productService.listAllProducts();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const productDetails = async (req, res) => {
    try {
        // get product details based on product id.
        let product = await productService.productDetails(req);
        res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const productBasedOnCategory = async (req, res) => {
    try {
        // get list of product based on category.
        let product = await productService.productBasedOnCategory(req);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {createProduct, listAllProducts, productDetails, productBasedOnCategory}
