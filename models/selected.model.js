import mongoose from "mongoose";

const selectedSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    // Define the subdocument schema separately for clarity
    selectedMembers: [
      new mongoose.Schema(
        {
          memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            required: true,
          },
        },
        { _id: false } // This is the key change that prevents auto-generating _id
      ),
    ],
  },
  { timestamps: true }
);

// Maintain our compound index for uniqueness
selectedSchema.index(
  { year: 1, "selectedMembers.memberId": 1 },
  { unique: true }
);

const Selected = mongoose.model("Selected", selectedSchema);

export default Selected;
