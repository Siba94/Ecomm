const categoryRepo = require('../../repositories/category/categoryRepository');

const createCategory = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {

            let category = await categoryRepo.findByName({name: req.body.name});

            if (!isEmpty(category)) {
                reject({
                    success: false,
                    message: 'Category already exist with this name.',
                    data: null
                });
            }

            let createdCategory = await categoryRepo.create({ name: req.body.name, description: req.body.description });

            if (createdCategory._id) {
                return resolve(createdCategory);
            }
            reject({
                success: false,
                message: 'Category creation failed.',
                data: null
            })
        } catch (error) {
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
    
}

const updateCategory = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            let category = await categoryRepo.findById(req.params.categoryId);

            if (isEmpty(category)) {
                reject({
                    success: false,
                    message: 'Category not found.',
                    data: null
                });
            }
            
            let updatedCategory = await categoryRepo.update(req.params.categoryId, {name: req.body.name, description: req.body.description});

            if (updatedCategory._id) {
                return resolve(updatedCategory);
            }
        } catch (error) {
            reject ({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const activateCategory = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            let category = await categoryRepo.findById(req.params.categoryId);

            if (isEmpty(category)) {
                reject({
                    success: false,
                    message: 'Category not found.',
                    data: null
                });
            }
            
            let updatedCategory = await categoryRepo.activate(req.params.categoryId);

            if (updatedCategory._id) {
                return resolve(updatedCategory);
            }
        } catch (error) {
            reject ({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const deActivateCategory = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            let category = await categoryRepo.findById(req.params.categoryId);

            if (isEmpty(category)) {
                reject({
                    success: false,
                    message: 'Category not found.',
                    data: null
                });
            }
            
            let updatedCategory = await categoryRepo.deactivate(req.params.categoryId);

            if (updatedCategory._id) {
                return resolve(updatedCategory);
            }
        } catch (error) {
            reject ({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

const getAllCategories = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            
            let categories = await categoryRepo.findAll();
            if (isEmpty(categories)) {
                reject({
                    success: false,
                    message: 'Unable to find any category list',
                    data: null
                })
            }
            return resolve(categories);

        } catch (error) {
            reject ({
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

module.exports = { createCategory, updateCategory, activateCategory, deActivateCategory, getAllCategories };