const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: {
    origin: '*'
} });
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRoute = require('./routes/users');
const contactsRoute = require('./routes/contacts');
const messagesRoute = require('./routes/messages');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => console.log('Connected to MongoDB'));

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const baseURL = '/api';

app.use(`${ baseURL }/users`, usersRoute);
app.use(`${ baseURL }/contacts`, contactsRoute);
app.use(`${ baseURL }/messages`, messagesRoute);

const users = {};

io.on('connection', socket => {
    users[socket.id] = { id: socket.id, activeChat: null }

    socket.on('ACTIVE_CHAT', ({ converstionID }) => users[socket.id].activeChat = converstionID);

    socket.on('NEW_MESSAGE', newMessage => {
        // Find a contact
        const activeChatUser = Object.values(users)
        .filter(contact => users[socket.id]?.activeChat === contact?.activeChat)
        .find(contact => contact.id !== socket.id);

        // Find a contact not in the same chat
        const findContactUser = Object.values(users)
        .filter(contact => users[socket.id]?.activeChat !== contact?.activeChat)
        .find(contact => contact.id !== socket.id);

        if(activeChatUser) {
            io.to(activeChatUser.id).emit('NEW_MESSAGE', {
                activeChat: users[socket.id]?.activeChat,
                message: newMessage
            });
        }

        if(findContactUser) {
            io.to(findContactUser.id).emit('UPDATE_CONTACTS_ORDER', {
                activeChat: users[socket.id]?.activeChat,
                message: newMessage
            });
        }
    });

    socket.on('disconnect', () => delete users[socket.id]);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is up and running on port ${ PORT }`));