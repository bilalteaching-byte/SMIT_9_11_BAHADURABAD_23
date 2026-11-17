const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, trim: true, unique: true, sparse: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    displayName: { type: String, trim: true, maxlength: 100 },
    roles: [{ type: String, enum: ["seller", "buyer"] }],
  },
  { timestamps: true, versionKey: false },
);

userSchema.index({ roles: 1, createdAt: -1 });

module.exports = mongoose.model("User", userSchema);
