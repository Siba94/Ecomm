const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true});

const user = mongoose.model('users', userSchema);
module.exports.User = user;