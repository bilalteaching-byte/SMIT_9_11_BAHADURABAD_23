const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// Placeholder identity boundary until authentication middleware is added.
// In production, set req.userId only from a verified access token.
function requireUser(req, res, next) {
  const userId = req.get('x-user-id');
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  req.userId = userId;
  next();
}

router.post('/register', async (req, res, next) => {
  try {
    const { phone, email, displayName, roles } = req.body;
    if ((!phone && !email) || !Array.isArray(roles) || roles.length === 0 ||
        roles.some((role) => !['seller', 'buyer'].includes(role))) {
      return res.status(400).json({ error: 'Provide a phone or email and valid roles.' });
    }
    const user = await User.create({ phone, email, displayName, roles: [...new Set(roles)] });
    return res.status(201).json({ user });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'Phone or email is already registered.' });
    if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
    return next(error);
  }
});

router.get('/me', requireUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json({ user });
  } catch (error) { return next(error); }
});

router.patch('/me', requireUser, async (req, res, next) => {
  try {
    const updates = {};
    if (Object.hasOwn(req.body, 'displayName')) updates.displayName = req.body.displayName;
    if (Object.hasOwn(req.body, 'phone')) updates.phone = req.body.phone;
    if (Object.hasOwn(req.body, 'email')) updates.email = req.body.email;
    if (Object.hasOwn(req.body, 'roles')) {
      if (!Array.isArray(req.body.roles) || req.body.roles.length === 0 ||
          req.body.roles.some((role) => !['seller', 'buyer'].includes(role))) {
        return res.status(400).json({ error: 'Roles must contain seller and/or buyer.' });
      }
      updates.roles = [...new Set(req.body.roles)];
    }
    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true, runValidators: true, context: 'query',
    });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json({ user });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'Phone or email is already registered.' });
    if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
    return next(error);
  }
});

module.exports = router;
