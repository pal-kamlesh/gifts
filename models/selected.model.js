import mongoose from "mongoose";

const selectedSchema = new mongoose.Schema(
  {
    year: { type: Number },
    selededMember: [
      {
        memberId: mongoose.Schema.Types.ObjectId,
        employeeName: String,
        delivered: Boolean,
        received: Boolean,
        deliveryDate: Date,
        gift1: {
          type: String,
        },
        gift2: {
          type: String,
        },
        gift3: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Selected = mongoose.model("Selected", selectedSchema);

export default Selected;
