const express = require('express');
const User = require('../models/users');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('dotenv').config();

Router.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const foundUserByEmail = await User.findOne({ email });
        if (foundUserByEmail) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const foundUserByUsername = await User.findOne({ username });
        if (foundUserByUsername) {
            return res.status(400).json({ error: 'Username is already taken, please choose another one' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        return res.status(200).json({ user: newUser, token });
    } catch (error) {
        console.error('Error in user signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await User.findOne({ username });
        if (!foundUser) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        return res.status(200).json({ user: foundUser, token });
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

Router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

Router.post('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { url } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { profile: url }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = Router;
