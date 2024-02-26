
const products = [
    { "id": 1, "name": "product1", "price": 900 },
    { "id": 2, "name": "product2", "price": 600 },
    { "id": 3, "name": "product3", "price": 400 },

];
const getAllProducts = async (req, res) => {
    try {
        res.status(200).json({
            message: "Load success",
            products
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

function getProductById(req, res) {
    const productId = parseInt(req.params.id); 
    const product = products.find(item => item.id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send("Product not found");
    }
}
export default {getAllProducts,getProductById};
