const db = require('./db');
const { ObjectID } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const addContact = async body => {
  const record = {
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  const collection = await getCollection(db, 'cats');
  const {
    ops: { result },
  } = await collection.insertOne(record);
  return result;
};

const listContacts = async () => {
  const collection = await getCollection(db, 'cats');
  const result = await collection.find({}).toArray();
  return result;
};

const getContactById = async id => {
  const collection = await getCollection(db, 'cats');
  const objectId = new ObjectID(id);
  console.log(objectId.getTimestamp());
  const { result } = await collection.find({ _id: objectId }).toArray();
  return result;
};

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'cats');
  const objectId = new ObjectID(id);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
  );
  return result;
};

const removeContact = async id => {
  const collection = await getCollection(db, 'cats');
  const objectId = new ObjectID(id);
  const { value: result } = await collection.findOneAndDelete({
    _id: objectId,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
