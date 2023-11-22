import mongoose from "mongoose";

const classesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    class: {
      type: String,
      required: true,
    },
    subscriptionPlans: [
      {
        plan: String,
        price: Number,
      },
    ],
    ageGroup: {
      type: String,
      enum: ["N1", "N2", "K1", "K2"],
      required: true,
    },
    classDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    zoomLink: {
      type: String,
    },
    repeatedDays: [
      {
        type: String,
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const Classes =
  mongoose.models.classes || mongoose.model("classes", classesSchema);
export default Classes;
