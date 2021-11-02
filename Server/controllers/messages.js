const Messages = require('../models/messages');
const Contacts = require('../models/contacts');

module.exports = {
    getMessages: async (req, res) => {
        const { converstionID, limit, skip } = req.params;

        const messagesCount = (await Messages.find({ converstionID })).length;

        Messages.find({ converstionID }).sort('-createdAt').skip(+skip).limit(+limit)
        .then(messages => {
            res.status(200).json({ 
                messages, 
                hasMore: +skip + messages.length >= messagesCount ? false : true, 
                totalMessages: messagesCount 
            })
        })
        .catch(err => res.status(400).json({ err }));
    },
    newMessage: async (req, res) => {
        const { converstionID } = req.params;
        const { message } = req.body;

        if(message.length < 1) return;

        const userInCoverstion = await Contacts.findOne({ converstionID, userID: req.user._id });
        if(!userInCoverstion) return;

        const converstionExist = await Contacts.findOne({ converstionID });
        if(!converstionExist) return;

        await Contacts.updateMany({ converstionID }, { lastMessage: message }, { new: true });

        const newMessage = new Messages({
            converstionID,
            userID: req.user._id,
            message
        });

        await newMessage.save()
        .then(message => res.status(200).json({ message }))
        .catch(err => res.status(400).json({ err }));
    }
}