const express = require('express');
const mongoose = require('mongoose');
const Listing = require('../models/Listing');

const router = express.Router();

function requireUser(req, res, next) {
  const userId = req.get('x-user-id');
  if (!userId || !mongoose.isValidObjectId(userId)) return res.status(401).json({ error: 'Authentication required.' });
  req.userId = userId;
  next();
}

router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
    const filter = { status: 'active' };
    if (req.query.cursor && mongoose.isValidObjectId(req.query.cursor)) {
      filter._id = { $lt: req.query.cursor };
    }
    const listings = await Listing.find(filter)
      .select('seller title description currency askingPrice quantityTotal quantityReserved maxRounds status createdAt')
      .sort({ _id: -1 }).limit(limit).lean();
    return res.json({ listings, nextCursor: listings.length === limit ? listings[listings.length - 1]._id : null });
  } catch (error) { return next(error); }
});

router.post('/', requireUser, async (req, res, next) => {
  try {
    const { title, description, currency, askingPrice, floor, quantityTotal, maxRounds } = req.body;
    const listing = await Listing.create({
      seller: req.userId, title, description, currency, askingPrice, floor, quantityTotal, maxRounds,
    });
    // Do not return the secret floor, even though it was present on the created document.
    const result = listing.toObject();
    delete result.floor;
    return res.status(201).json({ listing: result });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
    return next(error);
  }
});

router.get('/mine', requireUser, async (req, res, next) => {
  try {
    const listings = await Listing.find({ seller: req.userId })
      .select('title description currency askingPrice quantityTotal quantityReserved maxRounds status createdAt updatedAt')
      .sort({ createdAt: -1 }).lean();
    return res.json({ listings });
  } catch (error) { return next(error); }
});

router.get('/:listingId', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.listingId)) return res.status(400).json({ error: 'Invalid listing id.' });
    const listing = await Listing.findOne({ _id: req.params.listingId, status: 'active' })
      .select('seller title description currency askingPrice quantityTotal quantityReserved maxRounds status createdAt');
    if (!listing) return res.status(404).json({ error: 'Listing not found.' });
    return res.json({ listing });
  } catch (error) { return next(error); }
});

router.patch('/:listingId', requireUser, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.listingId)) return res.status(400).json({ error: 'Invalid listing id.' });
    const allowed = ['title', 'description', 'currency', 'askingPrice', 'floor', 'quantityTotal', 'maxRounds', 'status'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const listing = await Listing.findOne({ _id: req.params.listingId, seller: req.userId }).select('+floor');
    if (!listing) return res.status(404).json({ error: 'Listing not found.' });
    Object.assign(listing, updates);
    await listing.save();
    const result = listing.toObject();
    delete result.floor;
    return res.json({ listing: result });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
    return next(error);
  }
});

module.exports = router;
