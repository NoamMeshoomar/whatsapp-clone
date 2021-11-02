const Contacts = require('../models/contacts');
const Users = require('../models/users');
const shortid = require('shortid');

module.exports = {
    getAllContacts: (req, res) => {
        Contacts.find({ userID: req.user._id }).populate('contactID').sort('-updatedAt')
        .then(contacts => res.status(200).json({ contacts }))
        .catch(err => res.status(400).json({ err }));
    },
    addContact: async (req, res) => {
        const { newContactEmail } = req.body;
        const { _id, email } = req.user;

        const converstionID = shortid.generate();

        // if its the same user
        if(email === newContactEmail) return res.status(400).json({ message: 'אין באפשרותך לשלוח הודעה למשתמש של עצמך' });

        // if the converstionID exist
        const converstionIDExist = await Users.findOne({ converstionID });
        if(converstionIDExist) return;

        // if the user exist
        const userExist = await Users.findOne({ email: newContactEmail.toLowerCase() });
        if(!userExist) return res.status(400).json({ message: 'המשתמש לא קיים במערכת' });

        // if the user already have this contact
        const contactExist = await Contacts.findOne({ contactID: userExist._id, userID: _id });
        if(contactExist) return res.status(400).json({ message: 'המשתמש כבר קיים אצלך באנשי קשר' });

        const newContact = new Contacts({
            converstionID,
            contactID: userExist._id,
            userID: _id,
            lastMessage: ''
        });

        const newContact2 = new Contacts({
            converstionID,
            contactID: _id,
            userID: userExist._id,
            lastMessage: ''
        });

        await newContact.save()
        .then(async doc => {
            await newContact2.save();

            Contacts.findById(doc._id).populate('contactID')
            .then(contact => res.status(200).json({ contact }));
        })
        .catch(err => res.status(400).json({ err }));
    }
}