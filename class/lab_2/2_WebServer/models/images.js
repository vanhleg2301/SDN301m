import mongoose, { Schema } from "mongoose";

//create Images schema
const imagesSchema = new Schema(
  {
    path: {
      type: String,
      require: [true, "path name is required"],
      unique: [true, "path name already exists"],
    },
    url: {
      type: String,
      require: true,
    },
    caption: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Image = mongoose.model("Images", imagesSchema);
export default Image;
