const express = require('express');
const router = express.Router();

const validate = require('./validation');
const catsController = require('../../../controllers/cats');
const guard = require('../../../helpers/guard');

router
  .get('/', guard, catsController.get)
  .post('/', guard, validate.addContact, catsController.create);

router
  .get('/:id', guard, catsController.getById)
  .delete('/:id', guard, catsController.remove)
  .put('/:id', guard, validate.updateContact, catsController.update);

router.patch(
  '/:id/vaccinated',
  guard,
  validate.updateStatusContact,
  catsController.updateStatus,
);

module.exports = router;
