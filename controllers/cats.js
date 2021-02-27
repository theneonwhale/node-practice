const Cats = require('../model/cats');

const get = async (req, res, next) => {
  try {
    const cats = await Cats.listContacts();
    return res.json({ status: 'success', code: 200, data: { cats } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
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
};

const create = async (req, res, next) => {
  try {
    const cat = await Cats.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { cat } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
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
};

const update = async (req, res, next) => {
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
};

const updateStatus = async (req, res, next) => {
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
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
};
