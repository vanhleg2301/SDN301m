import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  url: { type: String },
  caption: { type: String },
});

// schema
const tutorialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Tutorial title is required"],
      unique: [true, "Tutorial title already existing"],
    },
    author: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    comments: {
      type: String,
      ref: "Comments",
    },
    category: {
      type: String,
      ref: "Categories",
    },
  },
  {
    timestamps: true,
  }
);

// Mapping to Collection 'tutorial'
const Tutorial = mongoose.model("Tutorials", tutorialSchema);
export default Tutorial;
