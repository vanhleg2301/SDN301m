import mongoose, { Schema } from "mongoose";
const commentSchema = new mongoose.Schema({
    rate: {
        type: Number,
        
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;