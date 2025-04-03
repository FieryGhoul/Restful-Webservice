// models/person.js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  mobileNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);
