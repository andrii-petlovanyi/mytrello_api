import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const List = mongoose.model("List", listSchema);
export { List };
