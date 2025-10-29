// giftlink-backend/Routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db'); // matches your project layout
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

router.post('/login', async (req, res) => {
  try {
    // Connect to DB
    const db = await connectToDatabase();

    // Access users collection
    const collection = db.collection('users');

    // Find user by email
    const theUser = await collection.findOne({ email: req.body.email });

    // If user not found
    if (!theUser) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const result = await bcryptjs.compare(req.body.password, theUser.password);
    if (!result) {
      console.error('Passwords do not match');
      return res.status(400).json({ error: 'Wrong password' });
    }

    // Prepare response details
    const userName = theUser.firstName;
    const userEmail = theUser.email;

    // Create JWT token
    const payload = { user: { id: theUser._id.toString() } };
    const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Send success response
    return res.json({ authtoken, userName, userEmail });
  } catch (e) {
    console.error('Error during login:', e);
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
