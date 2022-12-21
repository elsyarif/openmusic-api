const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required().lowercase().min(3),
  password: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
