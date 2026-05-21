const Joi = require('joi');

const recipeSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': 'Title is required'
    }),
    cardDescription: Joi.string().required().messages({
        'any.required': 'Short description is required'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required'
    }),
    cookTime: Joi.number().required().messages({
        'number.base': 'Cook time must be a number',
        'any.required': 'Cook time is required'
    }),
    prepTime: Joi.number().required().messages({
        'number.base': 'Prep time must be a number',
        'any.required': 'Prep time is required'
    }),
    Servings: Joi.number().required().messages({
        'number.base': 'Servings must be a number',
        'any.required': 'Servings is required'
    }),
    imgSrc: Joi.string().allow('').optional(),
    noOfIngredients: Joi.number().required().messages({
        'any.required': 'Number of ingredients is required'
    }),
    ingredients: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Ingredients are required'
    }),
    sts_process: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Step by step process is required'
    }),
    nutrition: Joi.object({
        calories: Joi.string().allow('').optional(),
        totalFat: Joi.string().allow('').optional(),
        saturatedFat: Joi.string().allow('').optional(),
        cholesterol: Joi.string().allow('').optional(),
        sodium: Joi.string().allow('').optional(),
        totalCarbohydrate: Joi.string().allow('').optional(),
        dietaryFiber: Joi.string().allow('').optional(),
        totalSugars: Joi.string().allow('').optional(),
        protein: Joi.string().allow('').optional(),
        vitaminC: Joi.string().allow('').optional(),
        calcium: Joi.string().allow('').optional(),
        iron: Joi.string().allow('').optional(),
        potassium: Joi.string().allow('').optional()
    }).optional()
});

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            error: error.details.map(el => el.message).join(', ')
        });
    }
    next();
};

module.exports = { recipeSchema, validate };