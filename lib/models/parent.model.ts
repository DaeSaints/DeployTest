import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Parent = mongoose.models.parent || mongoose.model("parent", parentSchema);
export default Parent;
