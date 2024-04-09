const { User } = require('../../models/user');

module.exports = {
    findByEmail: async (emailAddress) => {
        return await User.findOne({email: emailAddress});
    },
    createNewUser: async (data) => {
        return await User.create(data);
    }
}