const categoryService = require('../../services/category/category');

const createCategory = async (req, res) => {
    try {
        let createdCategory = await categoryService.createCategory(req);
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: createdCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        let updatedCategory = await categoryService.updateCategory(req);
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const activateCategory = async (req, res) => {
    try {
        let updatedCategory = await categoryService.activateCategory(req);
        res.status(200).json({
            success: true,
            message: 'Category activated successfully',
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const deActivateCategory = async (req, res) => {
    try {
        let updatedCategory = await categoryService.deActivateCategory(req);
        res.status(200).json({
            success: true,
            message: 'Category de-activated successfully',
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const getAllCategories = async (req, res) => {
    try {
        let categories = await categoryService.getAllCategories(req);
        res.status(200).json({
            success: true,
            message: 'Category list fetched successfully.',
            data: categories
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

module.exports = { createCategory, updateCategory, activateCategory, deActivateCategory, getAllCategories };