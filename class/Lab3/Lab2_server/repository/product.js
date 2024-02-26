import Product from "../models/product.js";
import Category from "../models/categories.js";
import Image from "../models/image.js";

// C: Create a new product
const createImages = async (images) => {
    try {
        const createdImages = await Promise.all(images.map(async (image) => {
            const newImage = await Image.create(image);
            return newImage;
        }));
        return createdImages;
    } catch (error) {
        console.error('Error creating images:', error);
        throw error;
    }
}

const createProduct = async (productData) => {
    try {
        const { name, price, description, category, images, comments } = productData;

        const existingProduct = await Product.findOne({ name }).exec();

        if (existingProduct) {
            return { error: 'This product already exists', status: 404 };
        }
        const imageIds = await createImages(images);
        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            images: imageIds,
            comments,
        });
        return newProduct.toObject();
    } catch (error) {
        throw new Error(error.toString());
    }
};



// R: Retrieve all products
const getAllProducts = async () => {
    try {
        const allProducts = await Product.find().populate("category").exec();
        return allProducts;
    } catch (error) {
        throw new Error(error.toString());
    }
}
const getCommentByProductId = async (ProductID) => {
    try {
        const product = await Product.findById(ProductID)
        if (!product) {
            throw new Error('Product not found')
        }
        const comments = product.comments;
        return comments;

    } catch (error) {
        throw new Error(error.toString());
    }
}


const getProductById = async (ProductID) => {
    try {
        const product = await Product.findById(ProductID).populate("category").exec();

        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(error.toString());
    }
}
// D: Delete a product by ID
const deleteProductById = async (productId) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId).exec();

        if (!deletedProduct) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        return deletedProduct;
    } catch (error) {
        throw new Error(error.toString());
    }
}

// U: Update a product by ID
const updateProductById = async (productId, updatedData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true, omitUndefined: true }).exec();
        if (!updatedProduct) throw new Error('Product not found');
        return updatedProduct;
    } catch (error) {
        throw new Error(error.toString());
    }
};


export default {
    createProduct, getAllProducts, getProductById, deleteProductById,
    updateProductById, getCommentByProductId
}