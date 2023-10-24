import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  image: String,
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
  provider: {
    type: String,
    default: "credentials",
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
