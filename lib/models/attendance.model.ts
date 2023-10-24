import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
  },
  date: {
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
  isClassCancelled: {
    type: Boolean,
    default: false,
  },
  classAttendanceType: {
    type: String,
    enum: ["regular", "special"],
    default: "regular",
  },
  classAttendanceStatus: {
    type: String,
    enum: ["ongoing", "pending", "cancelled"],
    default: "ongoing",
  },
  studentsPresent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  studentsNotPresent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  specialClassParticipants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Attendance =
  mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);
export default Attendance;
