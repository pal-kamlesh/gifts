import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
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
    info: {
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
    strict: false,
    versionKey: false,
    strictPopulate: false,
  }
);

// Index for common queries
memberSchema.index({ name: 1 });
memberSchema.index({ phone: 1 });
memberSchema.index({ isArchived: 1 });
memberSchema.index({ company: 1 });

const MemberHistorySchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  changes: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      oldState: {
        type: mongoose.Schema.Types.Mixed,
      },
      message: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
    },
  ],
});

memberSchema.virtual("history", {
  ref: "MemberHistory",
  localField: "_id",
  foreignField: "memberId",
  justOne: true,
});

const Member = mongoose.model("Member", memberSchema);
const MemberHistory = mongoose.model("MemberHistory", MemberHistorySchema);

export { Member, MemberHistory };
