const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not available with the requested email address.",
            data: null
        })
    } else {
        let isValidPassword = bcrypt.compareSync(req.body.password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "successfully loggedIn",
            data: generateJwtToken({username: user.name, email:user.email, id: user._id})
        })
    }
}

function generateJwtToken (username) {
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '24h'})
}

module.exports.UserLogin = userLogin;
