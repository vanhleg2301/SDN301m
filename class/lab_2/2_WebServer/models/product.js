import mongoose, { Schema } from "mongoose";

// Define a schema for images
const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  // You can add more properties like alt text, caption, etc. if needed
});

// Define a schema for comments
const commentSchema = new Schema({
  // Define properties for comments like author, rating, etc.
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  // You can add more properties like date, replies, etc. if needed
});

// Product schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: [true, "Product name already existing"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be > 0"],
    },
    description: {
      type: String,
      required: true,
    },
    images: [imageSchema], // Array of image schemas
    comments: [commentSchema], // Array of comment schemas
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mapping to Collection 'Products'
const Product = mongoose.model("Products", productSchema);
export default Product;
