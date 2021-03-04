const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for cat'],
      unique: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 25,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

catSchema.virtual('strAge').get(function () {
  return `${this.age} лет`
})

const Cat = model('cat', catSchema)

module.exports = Cat
