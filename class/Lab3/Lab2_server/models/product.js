import mongoose, { Schema } from "mongoose";


const imageSchema = new mongoose.Schema({
    url: {
      type: String,     
    },
    name: {
      type: String,    
    },
    caption: {
        type: String,        
    }
  });
  const commentSchema = new mongoose.Schema({
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },

});
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', 
        required: true
    },
    images: [imageSchema],
    comments: [commentSchema],
},
    {
        timestamps: true
    });

const Product = mongoose.model('Product', productSchema);

export default Product;