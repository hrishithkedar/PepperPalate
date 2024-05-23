const express = require('express');
const passport = require('passport');
const Router = express.Router();
const Recipe = require('../models/recipe');
const Nutrition = require('../models/nutrition');
const mongoose = require('mongoose');

const getRatingAndReviewCount = async (recipeId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      throw new Error('Invalid recipe ID');
    }

    const result = await Recipe.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(recipeId)
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews'
        }
      },
      {
        $project: {
          ratingCount: { $size: '$reviews' },
          reviewBodyCount: {
            $size: {
              $filter: {
                input: '$reviews',
                as: 'review',
                cond: { $ne: ['$$review.body', ''] }
              }
            }
          },
          averageRating: { $avg: '$reviews.rating' }
        }
      }
    ]);

    if (result.length > 0) {
      const { ratingCount, reviewBodyCount, averageRating } = result[0];
      return {
        ratingCount,
        reviewBodyCount,
        averageRating
      };
    } else {
      return {
        ratingCount: 0,
        reviewBodyCount: 0,
        averageRating: 0
      };
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const isAuthor = async (userID, authorID) => {
  return userID.toString() === authorID.toString();
};

Router.get("/userRecipes", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const foundRecipes = await Recipe.find({ user: req.user._id });
    res.json(foundRecipes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user recipes" });
  }
});

Router.get('/:recipeID/ratings', async (req, res) => {
  try {
    const { recipeID } = req.params;
    const obj = await getRatingAndReviewCount(recipeID);
    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ratings and reviews" });
  }
});

Router.get('/:recipe', async (req, res) => {
  try {
    const { recipe } = req.params;
    const foundRecipe = await Recipe.find({ $text: { $search: recipe } }).populate('user');
    if (!foundRecipe || foundRecipe.length === 0) {
      return res.status(404).json({ error: "No Recipes Found!" });
    }
    return res.status(200).json(foundRecipe);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: "No Recipes Found" });
  }
});

Router.get('/show/:recipeID', async (req, res) => {
  try {
    const { recipeID } = req.params;
    const foundRecipe = await Recipe.findById(recipeID)
      .populate('user')
      .populate('nutrition')
      .populate({
        path: 'reviews',
        populate: { path: 'user' }
      });

    if (!foundRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const obj = await getRatingAndReviewCount(recipeID);
    return res.status(200).json({ ...foundRecipe.toObject(), ...obj });
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

Router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, ingredients, nutrition } = req.body;

    const newNutri = await Nutrition.create(nutrition);

    const foundRecipe = await Recipe.findOne({ title, user: req.user._id });
    if (foundRecipe) {
      return res.status(400).json({ error: "Recipe already exists from your Account" });
    }

    const newRecipe = await Recipe.create({ title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, ingredients, nutrition: newNutri, user: req.user._id });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

Router.put('/:recipeID/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, ingredients, nutrition } = req.body;
    const { recipeID } = req.params;

    const foundRecipe = await Recipe.findById(recipeID);
    if (!await isAuthor(req.user._id, foundRecipe.user)) {
      return res.status(403).json({ error: "You are not authorized to update this recipe." });
    }

    let foundNutri = await Nutrition.findByIdAndUpdate(foundRecipe.nutrition, nutrition, { new: true });
    if (!foundNutri) {
      foundNutri = await Nutrition.create(nutrition);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeID, {
      title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, ingredients, nutrition: foundNutri._id, user: req.user._id
    }, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log('Error updating recipe:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

Router.delete('/:recipeID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { recipeID } = req.params;
    const userID = req.user._id;

    const foundRecipe = await Recipe.findById(recipeID);
    if (!await isAuthor(userID, foundRecipe.user)) {
      return res.status(403).json({ error: "You are not authorized to delete this recipe." });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeID);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

module.exports = Router;
