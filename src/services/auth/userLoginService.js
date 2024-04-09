const { User } = require('../../models/user');
const bcrypt = require('bcrypt');

const userLogin = async (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            // get the user details from db.
            let user = await User.findOne({ email: req.body.email });
            // reject if user not found.
            if (!user) {
                reject({
                    success: false,
                    message: "user not available with the requested email address.",
                    data: null
                })
            } else {
                // validate the password.
                let isValidPassword = bcrypt.compareSync(req.body.password, user.password)
                if (!isValidPassword) {
                    reject({
                        success: false,
                        message: 'Invalid password. Please retry!!',
                        data: null
                    })
                }
                // resolve successfully if all well.
                return resolve(user);
            }
        } catch (error) {
            console.log(error)
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = { userLogin }
