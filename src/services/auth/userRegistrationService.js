const bcrypt  = require('bcrypt');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "user already exist. please sign in.",
            data: null
        })
    } else {
        try {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {

                if (err) {
                    console.log("error", err);
                    return res.status(400).json({
                        success: false,
                        message: err,
                        data: null
                    
                    })
                }
            
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })

                await user.save()
                return res.status(201).json({
                    success: true,
                    message: "User created",
                    data: generateJwtToken({username: user.name, email: user.email, id: user._id})
                })
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                message: err.message,
                data: null
            })
        }
    }
}

function generateJwtToken (username) {
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '86400'})
}

module.exports.UserRegister = userRegister;
