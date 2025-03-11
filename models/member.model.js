import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    dob: {
      type: Date,
      validate: {
        validator: function (v) {
          return v < new Date(); // Ensure DOB is not in future
        },
        message: "Date of birth cannot be in the future.",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is requied"],
      trim: true,
      unique: true,
      match: [/^\d{10,15}$/, "Phone number must be between 10 to 15 digits."],
    },
    location: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is requied"],
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
      trim: true,
    },

    // Member Status
    isArchived: {
      type: Boolean,
      default: false,
    },
    deliveryStatus: {
      deliveryPerson: { type: String, trim: true },
      deliveryDate: { type: Date },
      confirmDelivery: { type: Boolean, default: false },
      onDeliveryNote: { type: String, trim: true },
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
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
