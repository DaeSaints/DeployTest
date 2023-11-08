import mongoose from "mongoose";
import { boolean } from "zod";

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
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileURL: {
      type: String,
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
    isOnboarded:{
      type: Boolean,
      default:false,
    },
    isAccepted:{
      type: Boolean,
      default:false,
    },
    role: {
      type: String,
      enum: [
        "general manager",
        "customer support",
        "teacher",
        "sales manager",
        "no role",
      ],
      default: "no role",
    },
  },
  { timestamps: true }
);

const Parent = mongoose.models.parents || mongoose.model("parents", parentSchema);
export default Parent;
