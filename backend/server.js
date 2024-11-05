const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const messageRoute = require('./routes/messages'); 
const resourcesRouter = require('./routes/resources');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newdisaster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/messages', messageRoute);  // Updated line
app.use('/api/resources', resourcesRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
