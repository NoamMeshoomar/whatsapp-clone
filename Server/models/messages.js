const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema({
    converstionID: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('messages', MessagesSchema);