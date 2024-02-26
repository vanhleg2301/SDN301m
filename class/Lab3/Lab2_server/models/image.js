import mongoose, { Schema } from "mongoose";
const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        
    },
    name:{
        type: String,
        
    }
    
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);
export default Image;