const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db'); // ✅ Correct path
const logger = console;
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Implement /update endpoint
router.put(
  '/update',
  [
    body('name', 'Name is required').notEmpty(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation errors in update request', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const email = req.headers.email;
      if (!email) {
        logger.error('Email not found in the request headers');
        return res.status(400).json({ error: 'Email not found in the request headers' });
      }

      const db = await connectToDatabase();
      const collection = db.collection('users');

      const existingUser = await collection.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      existingUser.name = req.body.name || existingUser.name;
      existingUser.password = req.body.password || existingUser.password;
      existingUser.updatedAt = new Date();

      const updatedUser = await collection.findOneAndUpdate(
        { email },
        { $set: existingUser },
        { returnDocument: 'after' }
      );

      if (!updatedUser.value) {
        return res.status(500).json({ error: "Failed to update user" });
      }

      const payload = {
        user: { id: updatedUser.value._id.toString() },
      };

      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ authtoken, message: 'Profile updated successfully' });

    } catch (e) {
      console.error('Error in /update endpoint:', e);
      return res.status(500).send('Internal server error');
    }
  }
);

module.exports = router;
