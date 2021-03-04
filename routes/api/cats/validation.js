const Joi = require('joi');

const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Failed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.addContact = (req, res, next) => {
  return validate(schemaCreateCat, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateCat, req.body, next);
};

module.exports.updateStatusContact = (req, res, next) => {
  return validate(schemaStatusCat, req.body, next);
};
