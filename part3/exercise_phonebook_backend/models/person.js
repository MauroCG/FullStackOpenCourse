const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

// Regular expression to check if the number string contains least 8 digits
const regMinDigits = /^(?=(.*\d){8})[-()+\d]{8,}$/

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(val) {
        //console.log(val, regMinDigits.test(val))
        return regMinDigits.test(val)
      },
      message: val => `The number must contain at least 8 digits (the given number ${val.value} is not valid)`
    }
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