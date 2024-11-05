const express = require('express');
const Contribution = require('../models/Contribution');

const router = express.Router();

// Get all contributions (if needed)
router.get('/contributions', async (req, res) => {
  try {
    const contributions = await Contribution.find();
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a contribution to a specific resource
router.post('/contribute', async (req, res) => {
  const { resourceName, resourceDescription, contributorName, contributorLocation, contributorPhone } = req.body;

  try {
    const contribution = new Contribution({
      resourceName,
      resourceDescription,
      contributorName,
      contributorLocation,
      contributorPhone,
    });
    
    await contribution.save();
    res.status(201).json({ message: 'Contribution added successfully' });
  } catch (error) {
    console.error('Error adding contribution:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
