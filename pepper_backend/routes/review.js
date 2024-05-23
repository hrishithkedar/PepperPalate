const express = require('express');
const passport = require('passport');
const Review = require('../models/review');
const Recipe = require('../models/recipe');
const Router = express.Router();

Router.post('/:recipeID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { recipeID } = req.params;
    const { rating, body } = req.body;

    try {
        const foundRecipe = await Recipe.findById(recipeID);
        
        if (!foundRecipe) {
            return res.status(404).json({ error: "No recipe found" });
        }

        const foundReview = await Review.findOne({ user: req.user._id, recipe: recipeID });
        
        if (foundReview) {
            return res.status(400).json({ error: "You have already posted a review" });
        }

        const newReview = await Review.create({ rating, body, user: req.user._id, recipe: recipeID });
        foundRecipe.reviews.push(newReview._id);
        await foundRecipe.save();

        return res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while processing your request" });
    }
});

module.exports = Router;
