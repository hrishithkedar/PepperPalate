const Joi = require('joi');

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot be more than 5',
        'any.required': 'Rating is required'
    }),
    body: Joi.string().allow('').optional()
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

module.exports = { reviewSchema, validate };