// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Route to get messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Route to post a new message
router.post('/', async (req, res) => {
  const { name, message } = req.body;

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error saving message' });
  }
});

module.exports = router;
