import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    message: {
      type: String,
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
