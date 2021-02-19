const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  return db.get('cats').value();
};

const getContactById = async id => {
  return db.get('cats').find({ id }).value();
};

const removeContact = async id => {
  const { record } = db.get('cats').remove({ id }).write();
  return record;
};

const addContact = async body => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  db.get('cats').push(record).write();
  return record;
};

const updateContact = async (id, body) => {
  const record = db.get('cats').find({ id }).assign(body).value();
  db.write();
  return record.id ? record : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
