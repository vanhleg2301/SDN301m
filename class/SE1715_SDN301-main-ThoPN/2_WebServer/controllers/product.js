import { productDAO } from "../dao/index.js";

const getAllProducts = async (req, res) => {
    try{
        // Giả lập dữ liệu được lấy từ DB
        const products = [
            {'id': 1, 'name': 'Product 1', 'price': 2000},
            {'id': 2, 'name': 'Product 2', 'price': 1500},
            {'id': 3, 'name': 'Product 3', 'price': 3000}
        ];
        // Nếu trạng thái lấy dữ liệu thành công thì gửi đối tượng bao gồm dữ liệu về client
        res.status(200).json({
            message: 'Load success',
            data: products
        });
    }catch(error){
        res.status(500).json({
            message_err: error.toString()
        });
    }
}

const createProduct = async(req, res) => {
    try {
        const {name, price, description, category} = req.body;
        const result = await productDAO.createProduct({name, price, description, category});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

export default{
    getAllProducts,
    createProduct
}