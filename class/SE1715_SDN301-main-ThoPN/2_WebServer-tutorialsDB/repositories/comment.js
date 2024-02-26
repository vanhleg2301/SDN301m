import Comment from "../models/comments.js";

const getAllComment = async () => {
  try {
    const allComments = await Comment.find().exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  getAllComment,
};
