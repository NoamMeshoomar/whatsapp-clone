const express = require('express');

const router = express.Router();

const auth = require('../middlewares/verifyToken');

const {
    getAllContacts,
    addContact
} = require('../controllers/contacts');

router.get('/', auth, getAllContacts);
router.post('/add', auth, addContact);

module.exports = router;