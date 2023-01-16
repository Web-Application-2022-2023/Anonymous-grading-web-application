const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isEmpty } = require('validator');
const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const { User } = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log(req.body);
        if (isEmpty(email)) {
            return res.status(400).json({ message: 'You need to add an email!' });
        }
        const user = (await User.findAll({ where: { email: email.toLowerCase() }}))[0];
        if (user) {
            return res.status(400).json({ message: 'Email Already Registered!' });
        }
        if (isEmpty(password)) {
            return res.status(400).json({ message: 'You need to add a password!' });
        }
        if (!regex.test(password)) {
            return res.status(400).json({ message: 'Password must contain 8 characters, 1 uppercase character and 1 symbol!' });
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email: email.toLowerCase(), password: encryptedPassword,  name :name});
        const payload = {
            userId: newUser.id,
            email: newUser.email
        };
        const options = { expiresIn: '30d' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return res.status(200).json({ message: 'User Created', token: token });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (isEmpty(email)) {
            return res.status(400).json({ message: 'You need to add an email!' });
        }
        const user = (await User.findAll({ where: { email: email.toLowerCase() }}))[0];
        if (!user) {
            return res.status(400).json({ message: "Email Doesn't Exists!" });
        }
        if (isEmpty(password)) {
            return res.status(400).json({ message: 'You need to add a password!' });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Password is incorrect!' });
        }
        const payload = {
            userId: user.id,
            email: user.email
        };
        const options = { expiresIn: '30d' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return res.status(200).json({ message:'Successful authentication', token });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;