require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/tickets');
const authRoutes = require('./routes/auth');        // ADD THIS

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);                  // ADD THIS

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection failed:', error.message);
  });