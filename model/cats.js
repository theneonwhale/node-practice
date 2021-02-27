const Cat = require('./schemas/cat');

const addContact = async body => {
  const result = await Cat.create(body);
  return result;
};

const listContacts = async () => {
  const result = await Cat.find({});
  return result;
};

const getContactById = async id => {
  const result = await Cat.findOne({ _id: id });
  console.log(result.id);
  console.log(result._id);

  return result;
};

const updateContact = async (id, body) => {
  const result = await Cat.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );
  return result;
};

const removeContact = async id => {
  const result = await Cat.findByIdAndRemove({
    _id: id,
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
