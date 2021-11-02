const mongoose = require('mongoose');

const ContactsSchema = mongoose.Schema({
    converstionID: { type: String, required: true },
    contactID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    lastMessage: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('contacts', ContactsSchema);