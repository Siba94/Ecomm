const bcrypt  = require('bcrypt');
const userRepo = require('../../repositories/users/userRepository');

const userRegister = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check if the user email already exist.
            // if found reject for creating user.
            let user = await userRepo.findByEmail(req.body.email)
            if (user) {
                reject({
                    success: false,
                    message: "user already exist. please sign in.",
                    data: null
                })
            } else {
                // hash the password and create new user based on given details.
                bcrypt.hash(req.body.password, 10, async (error, hash) => {
                    if (error) {
                        reject({
                            success: false,
                            message: err,
                            data: null
                        })
                    }
                
                    // create a new user
                    user = userRepo.createNewUser({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    })
                    return resolve(user);
                })
            }
        } catch ( error) {
            console.log(error);
            reject({
                success: false,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = { userRegister };
