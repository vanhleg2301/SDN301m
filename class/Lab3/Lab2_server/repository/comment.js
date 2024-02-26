import Product from "../models/product.js";
import Comment from "../models/comment.js";
const createComment = async (productId, commentData) => {
    try {
      // if (!productId || !commentData.text || !commentData.author) {
      //   throw new Error('Missing required fields: productId, commentData.text, commentData.author');
      // }
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      const newComment = new Comment(commentData);
      const comment = await createImages(commentData);
      product.comments.push(newComment);
      await product.save();
      return newComment;
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  export default { createComment }; 
  