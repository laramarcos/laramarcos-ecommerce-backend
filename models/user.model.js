const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin', 'client'], // o sacá 'client' si no lo vas a usar
    default: 'client'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // phone: String,
  // address: String,
  // address_Name: Number,
});

module.exports = mongoose.model('User', userSchema);
