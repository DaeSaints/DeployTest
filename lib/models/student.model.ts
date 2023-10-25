import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileURL: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },
    enrolledClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
      default: null,
    },
    status: {
      type: String,
      default: "Not Paid",
    },
    classExpiryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.student || mongoose.model("student", studentSchema);
export default Student;
