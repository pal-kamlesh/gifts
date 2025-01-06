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
    area: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    site: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    dob: {
      type: Date,
    },
    isArchived: Boolean,
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
