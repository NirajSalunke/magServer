import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required:true,
    },
    role: {
      type: String,
      enum: ["assistant", "administartor"],
      default: "assistant",
    },
    email: {
      type: String,
      // required:true,
      unique: true,
    },
    clerkid: {
      type: String,
      // required:true
    },
  },
  { timestamps: true }
);
const user = mongoose.model("User", userSchema);
export default user;
