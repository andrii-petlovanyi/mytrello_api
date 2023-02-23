import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export { Card };
