const mongoose = require('mongoose');
const Review = require('./review');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    imgSrc: {
        type: String,
    },
    cookTime: {
        type: Number,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    Servings: {
        type: Number,
        required: true
    },
    cardDescription: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    sts_process: [
        {
            type: String,
            required: true
        }
    ],
    noOfIngredients: {
        type: Number,
        required: true
    },
    ingredients: [
        {
            type: String,
            required: true
        }
    ],
    nutrition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutrition'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, { timestamps: true });

recipeSchema.index({ title: 'text' });

recipeSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        });
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;