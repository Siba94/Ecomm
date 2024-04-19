const { User } = require('../../models/user');

module.exports = {
    findByEmail: async (emailAddress, fetchAllProperties = true) => {
        let user = await User.findOne({email: emailAddress});
        if (!fetchAllProperties) {
            return {
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
        return user;
    },
    createNewUser: async (data) => {
        return await User.create(data).select(["name", "email", "role"]);
    },
    findById: async (userId) => {
        return await User.findOne({_id: userId}).select(["name", "email", "role"]);
    },
}