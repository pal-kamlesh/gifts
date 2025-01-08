import mongoose from "mongoose";

const selectedSchema = new mongoose.Schema(
  {
    year: { type: Number },
    selededMember: [
      {
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
      },
    ],
  },
  { timestamps: true }
);

const Selected = mongoose.model("Selected", selectedSchema);

export default Selected;
