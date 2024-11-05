
const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  resourceName: String,
  resourceDescription: String,
  contributorName: String,
  contributorLocation: String,
  contributorPhone: String,
});

module.exports = mongoose.model('Contribution', contributionSchema);
