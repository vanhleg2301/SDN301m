import { categoryDAO } from "../repository/index.js";

const getAllCategories = async (req, res) => {
    try{
        const result = await categoryDAO.getAllCategories()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({
            message_err: error.toString()
        });
    }
}
export default{
    getAllCategories
}