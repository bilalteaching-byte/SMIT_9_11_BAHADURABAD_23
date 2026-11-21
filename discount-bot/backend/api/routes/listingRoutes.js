const express = require("express");
const mongoose = require("mongoose");
const requireUser = require("../middleware/requireUser");
const Listing = require("../models/Listing");
const sendResponse = require("../utils/sendResponse");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
      100,
    );
    const filter = { status: "active" };
    if (req.query.cursor && mongoose.isValidObjectId(req.query.cursor)) {
      filter._id = { $lt: req.query.cursor };
    }
    const listings = await Listing.find(filter)
      .select(
        "seller title description imageUrls currency askingPrice quantityTotal quantityReserved maxRounds status createdAt",
      )
      .populate("seller", "displayName")
      .sort({ _id: -1 })
      .limit(limit)
      .lean();
    return sendResponse(res, 200, {
      listings,
      nextCursor:
        listings.length === limit ? listings[listings.length - 1]._id : null,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireUser, async (req, res, next) => {
  try {
    const {
      title,
      description,
      imageUrls,
      currency,
      askingPrice,
      floor,
      quantityTotal,
      maxRounds,
    } = req.body;
    const listing = await Listing.create({
      seller: req.userId,
      title,
      description,
      imageUrls,
      currency,
      askingPrice,
      floor,
      quantityTotal,
      maxRounds,
    });
    // Do not return the secret floor, even though it was present on the created document.
    const result = listing.toObject();
    delete result.floor;
    return sendResponse(res, 201, { listing: result });
  } catch (error) {
    if (error.name === "ValidationError")
      return sendResponse(res, 400, { error: error.message });
    return next(error);
  }
});

router.get("/mine", requireUser, async (req, res, next) => {
  try {
    const listings = await Listing.find({ seller: req.userId })
      .select(
        "title description imageUrls currency askingPrice quantityTotal quantityReserved maxRounds status createdAt updatedAt",
      )
      .sort({ createdAt: -1 })
      .lean();
    return sendResponse(res, 200, { listings });
  } catch (error) {
    return next(error);
  }
});

router.get("/:listingId", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.listingId))
      return sendResponse(res, 400, { error: "Invalid listing id." });
    const listing = await Listing.findOne({
      _id: req.params.listingId,
      status: "active",
    }).select(
      "seller title description imageUrls currency askingPrice quantityTotal quantityReserved maxRounds status createdAt",
    ).populate("seller", "displayName");
    if (!listing)
      return sendResponse(res, 404, { error: "Listing not found." });
    return sendResponse(res, 200, { listing });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:listingId", requireUser, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.listingId))
      return sendResponse(res, 400, { error: "Invalid listing id." });
    const allowed = [
      "title",
      "description",
      "imageUrls",
      "currency",
      "askingPrice",
      "floor",
      "quantityTotal",
      "maxRounds",
      "status",
    ];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowed.includes(key)),
    );
    const listing = await Listing.findOne({
      _id: req.params.listingId,
      seller: req.userId,
    }).select("+floor");
    if (!listing)
      return sendResponse(res, 404, { error: "Listing not found." });
    Object.assign(listing, updates);
    await listing.save();
    const result = listing.toObject();
    delete result.floor;
    return sendResponse(res, 200, { listing: result });
  } catch (error) {
    if (error.name === "ValidationError")
      return sendResponse(res, 400, { error: error.message });
    return next(error);
  }
});

module.exports = router;
