// models/Resource.js
const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String,
});

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  contributions: [contributionSchema]  // Array to store contributions for each resource
});

module.exports = mongoose.model('Resource', resourceSchema);
