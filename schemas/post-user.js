var Joi = require('joi');

module.exports = Joi.object().keys({
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
}).with('email', 'password');
