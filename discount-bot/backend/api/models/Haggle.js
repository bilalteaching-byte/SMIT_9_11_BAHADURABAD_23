const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  number: { type: Number, required: true, min: 1 },
  offerPrice: { type: Number, required: true, min: 1, validate: Number.isSafeInteger },
  counterPrice: { type: Number, min: 1, validate: Number.isSafeInteger },
  response: {
    type: String,
    required: true,
    enum: ['counter', 'accept', 'repeat_counter', 'walk_away'],
  },
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const haggleSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: {
    type: String,
    enum: ['active', 'deal_made', 'walked_away', 'abandoned'],
    default: 'active',
    index: true,
  },
  maxRounds: { type: Number, required: true, min: 1, max: 50 },
  rounds: { type: [roundSchema], default: [] },
  deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
}, { timestamps: true, versionKey: false });

// One buyer should not create concurrent haggles against the same listing.
// Enforce this in the service with an atomic status transition; this index helps lookups.
haggleSchema.index({ buyer: 1, startedAt: -1 });
haggleSchema.index({ listing: 1, status: 1, startedAt: -1 });

haggleSchema.pre('validate', function validateHaggle(next) {
  if (this.rounds.length > this.maxRounds) {
    this.invalidate('rounds', 'A Haggle cannot exceed its maximum number of Rounds.');
  }
  this.rounds.forEach((round, index) => {
    if (round.number !== index + 1) {
      round.invalidate('number', 'Round numbers must be sequential.');
    }
    if ((round.response === 'counter') !== (round.counterPrice != null)) {
      round.invalidate('counterPrice', 'Only a counter response must include a Counter price.');
    }
  });
  if (this.status === 'active' && this.endedAt != null) {
    this.invalidate('endedAt', 'An active Haggle cannot have an end time.');
  }
  if (this.status !== 'active' && this.endedAt == null) {
    this.invalidate('endedAt', 'A closed Haggle must have an end time.');
  }
  if ((this.status === 'deal_made') !== (this.deal != null)) {
    this.invalidate('deal', 'A Deal reference is required exactly when the Haggle ends in a Deal.');
  }
  next();
});

module.exports = mongoose.model('Haggle', haggleSchema);
