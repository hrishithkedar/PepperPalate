const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        'string.min': 'Username must be at least 3 characters',
        'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    })
});

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'Username is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
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

module.exports = { signupSchema, loginSchema, validate };