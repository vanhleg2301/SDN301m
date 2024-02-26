import mongoose, { Schema } from "mongoose";

// Category schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name already exists"],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mapping to Collection 'Categories'
const Category = mongoose.model("Categories", categorySchema);
export default Category;
