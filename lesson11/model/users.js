const User = require('./schemas/user')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken })
}

const create = async ({ name, email, password, sex, verify, verifyToken }) => {
  const user = new User({ name, email, password, sex, verify, verifyToken })
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken }) // [1]
}

const updateAvatar = async (id, avatar, imgIdCloud) => {
  return await User.updateOne({ _id: id }, { avatar, imgIdCloud })
}

module.exports = {
  findByEmail,
  findById,
  findByVerifyToken,
  create,
  updateToken,
  updateAvatar,
  updateVerifyToken,
}
