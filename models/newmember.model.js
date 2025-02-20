const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    // Personal & Contact Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },

    // Gifters Status
    gifters: {
      EPCORN: { type: Boolean, default: false },
      FJQ: { type: Boolean, default: false },
      SFQ: { type: Boolean, default: false },
      STQ: { type: Boolean, default: false },
      SWT: { type: Boolean, default: false },
    },

    // Gift and Site Details - Dynamic Structure
    gifts: {
      foodHamper: {
        type: String,
        trim: true,
        default: "na",
      },
      liquid: {
        type: String,
        trim: true,
        default: "na",
      },
      gift: {
        type: String,
        trim: true,
        default: "na",
      },
      additionalGifts: {
        type: String,
        trim: true,
      },
    },

    // Company Information
    company: {
      type: String,
      trim: true,
    },
    additionalInfo: {
      type: String,
      required: true,
      trim: true,
    },

    // Member Status
    isArchived: {
      type: Boolean,
      default: false,
    },
    deliveryStatus: {
      deliveryPerson: { type: String },
      deliveryDate: { type: Date },
      confirmDelivery: { type: Boolean, default: false },
      onDeliveryNote: { type: String },
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // This will allow adding new fields dynamically if needed
    strict: false,
  }
);

// Index for common queries
memberSchema.index({ name: 1 });
memberSchema.index({ phone: 1 });
memberSchema.index({ isArchived: 1 });
memberSchema.index({ company: 1 });

// Middleware to handle updates
memberSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
