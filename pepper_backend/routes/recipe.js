const express = require('express');
const passport = require('passport');
const Router = express.Router();
const Recipe = require('../models/recipe');
const Nutrition = require('../models/nutrition');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const { AppError } = require('../middleware/errorMiddleware');
const { recipeSchema, validate } = require('../validators/recipeValidator');
const getRatingAndReviewCount = async (recipeId) => {
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        throw new AppError('Invalid recipe ID', 400);
    }

    const result = await Recipe.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(recipeId) } },
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
        return result[0];
    }
    return { ratingCount: 0, reviewBodyCount: 0, averageRating: 0 };
};

const isAuthor = (userID, authorID) => {
    return userID.toString() === authorID.toString();
};

Router.get("/userRecipes", passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => {
    const foundRecipes = await Recipe.find({ user: req.user._id });
    res.json(foundRecipes);
}));

Router.get('/:recipeID/ratings', asyncHandler(async (req, res) => {
    const { recipeID } = req.params;
    const obj = await getRatingAndReviewCount(recipeID);
    res.json(obj);
}));
Router.get('/trending', asyncHandler(async (req, res) => {
    const trendingRecipes = await Recipe.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: 'reviews',
                foreignField: '_id',
                as: 'reviewData'
            }
        },
        {
            $addFields: {
                averageRating: { $avg: '$reviewData.rating' },
                reviewCount: { $size: '$reviewData' }
            }
        },
        {
            $match: {
                reviewCount: { $gt: 0 }
            }
        },
        {
            $sort: {
                averageRating: -1,
                reviewCount: -1
            }
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        }
    ]);

    if (!trendingRecipes || trendingRecipes.length === 0) {
        throw new AppError("No trending recipes found", 404);
    }

    return res.status(200).json(trendingRecipes);
}));
Router.get('/:recipe', asyncHandler(async (req, res) => {
    const { recipe } = req.params;
    const foundRecipe = await Recipe.find({ $text: { $search: recipe } }).populate('user');
    if (!foundRecipe || foundRecipe.length === 0) {
        throw new AppError("No Recipes Found!", 404);
    }
    return res.status(200).json(foundRecipe);
}));

Router.get('/', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalRecipes = await Recipe.countDocuments();
    const totalPages = Math.ceil(totalRecipes / limit);

    const recentRecipes = await Recipe.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user');

    if (!recentRecipes || recentRecipes.length === 0) {
        throw new AppError("No recipes found", 404);
    }

    return res.status(200).json({
        recipes: recentRecipes,
        currentPage: page,
        totalPages,
        totalRecipes
    });
}));

Router.get('/show/:recipeID', asyncHandler(async (req, res) => {
    const { recipeID } = req.params;
    const foundRecipe = await Recipe.findById(recipeID)
        .populate('user')
        .populate('nutrition')
        .populate({ path: 'reviews', populate: { path: 'user' } });
    if (!foundRecipe) {
        throw new AppError("Recipe not found", 404);
    }
    const obj = await getRatingAndReviewCount(recipeID);
    return res.status(200).json({ ...foundRecipe.toObject(), ...obj });
}));

Router.post('/', passport.authenticate('jwt', { session: false }), validate(recipeSchema), asyncHandler(async (req, res) => {
    const { title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, ingredients, nutrition } = req.body;
    const newNutri = await Nutrition.create(nutrition);
    const foundRecipe = await Recipe.findOne({ title, user: req.user._id });
    if (foundRecipe) {
        throw new AppError("Recipe already exists from your Account", 400);
    }
    const newRecipe = await Recipe.create({ title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, ingredients, nutrition: newNutri, user: req.user._id });
    return res.status(201).json(newRecipe);
}));

Router.patch('/:recipeID/update', passport.authenticate('jwt', { session: false }),validate(recipeSchema) ,asyncHandler(async (req, res) => {
    const { title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, nutrition } = req.body;
    const { recipeID } = req.params;
    const foundRecipe = await Recipe.findById(recipeID);
    if (!foundRecipe) {
        throw new AppError("Recipe not found", 404);
    }
    if (!isAuthor(req.user._id, foundRecipe.user)) {
        throw new AppError("You are not authorized to update this recipe", 403);
    }
    let foundNutri = await Nutrition.findByIdAndUpdate(foundRecipe.nutrition, nutrition, { new: true });
    if (!foundNutri) {
        foundNutri = await Nutrition.create(nutrition);
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeID, {
        title, imgSrc, cookTime, prepTime, Servings, cardDescription, description, sts_process, noOfIngredients, nutrition: foundNutri._id, user: req.user._id
    }, { new: true });
    return res.status(200).json(updatedRecipe);
}));

Router.delete('/:recipeID', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => {
    const { recipeID } = req.params;
    const userID = req.user._id;
    const foundRecipe = await Recipe.findById(recipeID);
    if (!foundRecipe) {
        throw new AppError("Recipe not found", 404);
    }
    if (!isAuthor(userID, foundRecipe.user)) {
        throw new AppError("You are not authorized to delete this recipe", 403);
    }
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeID);
    return res.status(200).json(deletedRecipe);
}));

module.exports = Router;