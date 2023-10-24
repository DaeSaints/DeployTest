import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    status: {
      type: String,
      default: "Not Paid",
    },
    paidDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
export default Transaction;
