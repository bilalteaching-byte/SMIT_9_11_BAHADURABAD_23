const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true, unique: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  quantity: { type: Number, required: true, min: 1, validate: Number.isSafeInteger },
  status: { type: String, enum: ['active', 'released', 'fulfilled'], default: 'active', index: true },
  releasedAt: Date,
}, { timestamps: true, versionKey: false });

reservationSchema.index({ listing: 1, status: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
