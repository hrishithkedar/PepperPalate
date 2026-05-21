const express = require('express');
const User = require('../models/users');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const asyncHandler = require('../utils/asyncHandler');
const { AppError } = require('../middleware/errorMiddleware');
require('dotenv').config();

Router.post('/signup', asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    const foundUserByEmail = await User.findOne({ email });
    if (foundUserByEmail) {
        throw new AppError('User with this email already exists', 400);
    }

    const foundUserByUsername = await User.findOne({ username });
    if (foundUserByUsername) {
        throw new AppError('Username is already taken, please choose another one', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    return res.status(200).json({ user: newUser, token });
}));

Router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
        throw new AppError('Invalid username or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid username or password', 401);
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    return res.status(200).json({ user: foundUser, token });
}));

Router.get('/getUser', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => {
    res.json(req.user);
}));

Router.post('/profile', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => {
    const { url } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { profile: url }, { new: true });
    if (!updatedUser) {
        throw new AppError('User not found', 404);
    }
    res.json(updatedUser);
}));

module.exports = Router;