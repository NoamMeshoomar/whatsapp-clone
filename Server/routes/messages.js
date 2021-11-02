const express = require('express');

const router = express.Router();

const auth = require('../middlewares/verifyToken');

const {
    getMessages,
    newMessage
} = require('../controllers/messages');

router.get('/:converstionID/:limit/:skip', auth, getMessages);
router.post('/new/:converstionID', auth, newMessage);

module.exports = router;