const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    image: { type: String, default: 'default-profile.jpg' },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema);