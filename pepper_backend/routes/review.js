const express = require('express');
const passport = require('passport');
const Review = require('../models/review');
const Recipe = require('../models/recipe');
const Router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { AppError } = require('../middleware/errorMiddleware');

Router.post('/:recipeID', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => {
    const { recipeID } = req.params;
    const { rating, body } = req.body;

    const foundRecipe = await Recipe.findById(recipeID);
    if (!foundRecipe) {
        throw new AppError("No recipe found", 404);
    }

    const foundReview = await Review.findOne({ user: req.user._id, recipe: recipeID });
    if (foundReview) {
        throw new AppError("You have already posted a review", 400);
    }

    const newReview = await Review.create({ rating, body, user: req.user._id, recipe: recipeID });
    foundRecipe.reviews.push(newReview._id);
    await foundRecipe.save();

    return res.status(201).json(newReview);
}));

module.exports = Router;