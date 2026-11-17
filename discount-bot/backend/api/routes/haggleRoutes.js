const express = require('express');
const mongoose = require('mongoose');
const Haggle = require('../models/Haggle');
const Listing = require('../models/Listing');

const router = express.Router();

function requireUser(req, res, next) {
  const userId = req.get('x-user-id');
  if (!userId || !mongoose.isValidObjectId(userId)) return res.status(401).json({ error: 'Authentication required.' });
  req.userId = userId;
  next();
}

router.post('/', requireUser, async (req, res, next) => {
  try {
    const { listingId } = req.body;
    if (!mongoose.isValidObjectId(listingId)) return res.status(400).json({ error: 'Valid listingId is required.' });
    const listing = await Listing.findOne({ _id: listingId, status: 'active' })
      .select('seller maxRounds quantityTotal quantityReserved');
    if (!listing || listing.quantityTotal <= listing.quantityReserved) {
      return res.status(404).json({ error: 'Listing is unavailable.' });
    }
    const haggle = await Haggle.create({ listing: listing._id, buyer: req.userId, maxRounds: listing.maxRounds });
    return res.status(201).json({ haggle });
  } catch (error) { return next(error); }
});

router.get('/', requireUser, async (req, res, next) => {
  try {
    const haggles = await Haggle.find({ buyer: req.userId })
      .select('-rounds.offerPrice')
      .populate('listing', 'title currency askingPrice status')
      .sort({ startedAt: -1 }).limit(100).lean();
    return res.json({ haggles });
  } catch (error) { return next(error); }
});

router.get('/:haggleId', requireUser, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.haggleId)) return res.status(400).json({ error: 'Invalid haggle id.' });
    const haggle = await Haggle.findOne({ _id: req.params.haggleId, buyer: req.userId })
      .populate('listing', 'title currency askingPrice status');
    if (!haggle) return res.status(404).json({ error: 'Haggle not found.' });
    return res.json({ haggle });
  } catch (error) { return next(error); }
});

// Offer submission is intentionally not implemented here yet: backend pricing
// must decide accept/counter/walk-away without exposing the Floor to a language model.

module.exports = router;
