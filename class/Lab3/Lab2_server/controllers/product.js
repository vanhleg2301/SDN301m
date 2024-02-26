import { productDAO } from "../repository/index.js";


const getAllProducts = async (req, res) => {
    try{
        const result = await productDAO.getAllProducts()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({
            message_err: error.toString()
        });
    }
}
const getCommentByProductId = async (req, res) => {
    try{
        const ProductID = req.params.id;
        const result = await productDAO.getCommentByProductId(ProductID)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({
            message_err: error.toString()
        });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, images, comments } = req.body;

        
        const validImages = Array.isArray(images) ? images : [];

        const result = await productDAO.createProduct({
            name,
            images: validImages, 
            comments,
            price,
            description,
            category
        });

        if (result.error) {
            res.status(result.status).json({ error: result.error });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}


const getProductById = async (req,res)=>{
    try {
        const ProductID = req.params.id;
        const result = await productDAO.getProductById(ProductID)
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}
// U: Update a product by ID
const updateProductById = async (req, res) => {
    try {
        const ProductID = req.params.id;
        const updatedData = req.body;
        const result = await productDAO.updateProductById(ProductID, updatedData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

// D: Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
        const ProductID = req.params.id;
        const result = await productDAO.deleteProductById(ProductID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getCommentByProductId
}