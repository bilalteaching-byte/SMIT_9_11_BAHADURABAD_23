const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  haggle: { type: mongoose.Schema.Types.ObjectId, ref: 'Haggle', required: true, unique: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  // Snapshot at agreement time; later listing edits must not change this Deal.
  agreedUnitPrice: { type: Number, required: true, min: 1, validate: Number.isSafeInteger },
  quantity: { type: Number, required: true, min: 1, validate: Number.isSafeInteger },
  currency: { type: String, required: true, uppercase: true, minlength: 3, maxlength: 3 },
  status: { type: String, enum: ['open', 'completed', 'cancelled'], default: 'open', index: true },
  agreedAt: { type: Date, default: Date.now },
  completedAt: Date,
}, { timestamps: true, versionKey: false });

dealSchema.index({ buyer: 1, agreedAt: -1 });
dealSchema.index({ listing: 1, status: 1, agreedAt: -1 });

module.exports = mongoose.model('Deal', dealSchema);
