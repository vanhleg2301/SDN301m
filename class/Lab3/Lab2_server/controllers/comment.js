import { commentDAO } from "../repository/index.js";

const createComment = async(req,res)=>{
    try {
        const productId = req.params.id;
        const commentData = req.body;
        const result = await commentDAO.createComment(productId, commentData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}


export default {
    createComment
}