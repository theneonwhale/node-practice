const express = require('express');
const router = express.Router();

const validate = require('./validation');
const catsController = require('../../controllers/cats');

router
  .get('/', catsController.get)
  .post('/', validate.addContact, catsController.create);

router
  .get('/:id', catsController.getById)
  .delete('/:id', catsController.remove)
  .put('/:id', validate.updateContact, catsController.update);

router.patch(
  '/:id/vaccinated',
  validate.updateStatusContact,
  catsController.updateStatus,
);

module.exports = router;
