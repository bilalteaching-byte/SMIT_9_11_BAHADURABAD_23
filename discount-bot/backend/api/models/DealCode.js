const mongoose = require('mongoose');

const dealCodeSchema = new mongoose.Schema({
  deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true, unique: true },
  // Persist only a cryptographic hash; show the plaintext code to the Buyer once.
  codeHash: { type: String, required: true, unique: true, select: false },
  redeemedAt: Date,
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('DealCode', dealCodeSchema);
