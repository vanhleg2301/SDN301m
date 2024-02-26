import Product from "../models/product.js";

// C: Create a new product
const createProduct = async({
    name,
    price,
    description,
    category
})=>{
    try {
        // Fetch a product by name
        const existingProduct = await Product.findOne({name}).exec();
        // Check existing product
        if(existingProduct!=null)
            throw new Error('This product existing');

        // Create product
        const newProduct = await Product.create({name, price, description, category});
        // Return newProduct created
        return newProduct._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    createProduct
}