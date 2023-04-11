import mongoose, { model } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: false,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatUser",
      required: true,
    },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default model("Messages", messageSchema);
