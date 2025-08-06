const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const propertyRoutes = require('./routes/properties');
const authRoutes = require('./routes/auth');
const chatbotRoutes = require('./routes/chatbot');
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));