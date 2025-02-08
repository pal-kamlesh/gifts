import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    info: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gift1: {
      type: String,
    },
    gift2: {
      type: String,
    },
    gift3: {
      type: String,
    },
    deliveryPerson: String,
    confirmDelivery: Boolean,
    onDeliveryNote: String,
    deliveryDate: Date,
    isArchived: Boolean,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

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
