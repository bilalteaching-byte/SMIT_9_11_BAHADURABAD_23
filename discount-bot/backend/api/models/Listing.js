const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 5000, default: "" },
    imageUrls: {
      type: [{ type: String, trim: true, maxlength: 2048 }],
      default: [],
      validate: {
        validator: (urls) =>
          urls.length <= 10 && urls.every((url) => /^https:\/\//i.test(url)),
        message: "Provide up to 10 valid HTTPS image URLs.",
      },
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      minlength: 3,
      maxlength: 3,
    },
    // Store money as integer minor units (for example, paisa), never floating point.
    askingPrice: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },
    // Secret seller limit. select:false prevents accidental inclusion in ordinary queries.
    floor: {
      type: Number,
      required: true,
      min: 1,
      select: false,
      validate: Number.isSafeInteger,
    },
    quantityTotal: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },
    quantityReserved: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: Number.isSafeInteger,
    },
    maxRounds: { type: Number, required: true, min: 1, max: 50, default: 5 },
    status: {
      type: String,
      enum: ["draft", "active", "paused", "sold_out", "archived"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

// listingSchema.virtual("quantityAvailable").get(function quantityAvailable() {
//   return this.quantityTotal - this.quantityReserved;
// });

listingSchema.pre("validate", function validateListing(next) {
  if (
    this.floor != null &&
    this.askingPrice != null &&
    this.floor > this.askingPrice
  ) {
    this.invalidate("floor", "Floor cannot exceed the Asking Price.");
  }
  if (this.quantityReserved > this.quantityTotal) {
    this.invalidate(
      "quantityReserved",
      "Reserved quantity cannot exceed total quantity.",
    );
  }
  next();
});

listingSchema.index({ status: 1, createdAt: -1 });
listingSchema.index({ seller: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model("Listing", listingSchema);
