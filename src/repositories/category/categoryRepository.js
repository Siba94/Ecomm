const { Category } = require('../../models/category');

module.exports = {
    create: async (data) => {
        const { name, description } = data;
        return await Category.create({
            name, description
        })
    },

    findById: async (id) => {
        return await Category.findOne({_id: id});
    },

    findByName: async (data) => {
        const { name } = data;
        return await Category.find({name: name});
    }, 

    update: async (id, data) => {
        const { name, description } = data;
        return await Category.findOneAndUpdate({_id: id}, 
            { name: name, description: description }, 
            { new: true, upsert: false}
        );
    },
    
    activate: async (id) => {
        return await Category.findOneAndUpdate({_id: id}, 
            { isActive: true}, 
            { new: true, upsert: false}
        );
    },

    deactivate: async (id) => {
        return await Category.findOneAndUpdate({_id: id}, 
            { isActive: false}, 
            { new: true, upsert: false}
        );
    },

    findAll: async () => {
        return await Category.find({isActive: true});
    }
};