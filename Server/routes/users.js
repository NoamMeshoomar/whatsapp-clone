const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const {
    getCurrentUser,
    login,
    register,
    changeProfilePicture
} = require('../controllers/users');

const upload = require('../middlewares/uploadImage');
const auth = require('../middlewares/verifyToken');

const Users = require('../models/users');

const userValidations = {
    registerValidation: [
        body('username')
        .isLength({ min: 2, max: 20 })
        .withMessage('שם משתמש צריך להיות 2-20 תווים')
        .isString(),
        body('email')
        .isEmail()
        .withMessage('נא הקלד כתובת אימייל חוקית')
        .custom(async email => {
            const emailExist = await Users.findOne({ email });
    
            if(emailExist) throw new Error('כתובת האימייל אינה חוקית או שקיימת במערכת');
    
            return true;
        })
        .isString(),
        body('password')
        .isLength({ min: 5, max: 30 })
        .withMessage('סיסמא צריכה להיות 5-30 תווים')
        .isString()
        .custom((value, { req }) => {
            if(value !== req.body.confirmPassword) throw new Error('סיסמאות צריכות להיות תואמות');
    
            return true;
        })
    ]
}

router.get('/current-user', auth, getCurrentUser);
router.post('/login', login);
router.post('/register', userValidations.registerValidation, register);
router.post('/picture', auth, upload.single('picture'), changeProfilePicture);

module.exports = router;