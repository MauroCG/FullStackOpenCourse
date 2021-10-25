const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  number: {
    type: String,
    required: true
  },
})

personSchema.plugin(uniqueValidator)  // Adds the unique validation functionality

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)