import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Images", imageSchema);
export default Image;
