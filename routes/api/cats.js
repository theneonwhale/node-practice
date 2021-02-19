const express = require('express');
const router = express.Router();
const Cats = require('../../model/cats');
const validate = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const cats = await Cats.listContacts();
    return res.json({ status: 'success', code: 200, data: { cats } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cat = await Cats.getContactById(req.params.id);
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', validate.addContact, async (req, res, next) => {
  try {
    const cat = await Cats.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { cat } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const cat = await Cats.removeContact(req.params.id);
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validate.updateContact, async (req, res, next) => {
  try {
    const cat = await Cats.updateContact(req.params.id, req.body);
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id/vaccinated',
  validate.updateStatusContact,
  async (req, res, next) => {
    try {
      const cat = await Cats.updateContact(req.params.id, req.body);
      if (cat) {
        return res.json({ status: 'success', code: 200, data: { cat } });
      } else {
        return res
          .status(404)
          .json({ status: 'error', code: 404, data: 'Not found' });
      }
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
