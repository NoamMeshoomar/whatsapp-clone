const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

module.exports = {
    getCurrentUser: (req, res) => {
        Users.findById(req.user._id)
        .then(user => {
            const { _id, image, username, email } = user;

            res.status(200).json({ user: { _id, image, username, email } });
        })
        .catch(err => res.status(400).json({ err }));
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const errors = [];

        const emailExist = await Users.findOne({ email: email.toLowerCase() });
        if(!emailExist) errors.push({ msg: 'אימייל לא חוקי או לא קיים' });

        const validPassword = await bcrypt.compare(password, emailExist ? emailExist.password : '');
        if(!validPassword) errors.push({ msg: 'אימייל או סיסמא אינם נכונים' });

        if(errors.length > 0) return res.status(400).json({ errors });

        const token = jwt.sign({ _id: emailExist._id, email: emailExist.email }, process.env.JWT_SECRET, { expiresIn: '12h' });

        const user = {
            _id: emailExist._id,
            image: emailExist.image,
            username: emailExist.username,
            email: emailExist.email
        }

        res.status(200).json({ token, user });
    },
    register: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, email, password, confirmPassword } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            confirmPassword
        });

        await newUser.save()
        .then(result => {
            const { _id, image, username, email } = result;

            const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '12h' });

            const user = {
                _id,
                image,
                username,
                email
            }

            res.status(200).json({ message: 'המשתמש נוצר בהצלחה!', token, user });
        })
        .catch(() => res.status(400).json({ error: 'נכשל ביצירת המשתמש.' }));
    },
    changeProfilePicture: async (req, res) => {
        try {
            await Users.findByIdAndUpdate(req.user._id, { image: req.file.filename }, { new: true });
            res.status(200).json({ message: 'הפרופיל עודכן בהצלחה!' });
        } catch (err) {
            if(err) return console.error(err);
        }
    }
}