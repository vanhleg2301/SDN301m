import { commentDAO } from "../repositories/index.js";

const getAllCommentsController = async (req, res) => {
  try {
    const comments = await commentDAO.getAllComment();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString(),
    });
  }
};

export default {
  getAllCommentsController,
};
