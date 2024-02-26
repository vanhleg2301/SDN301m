import Category from "../models/categories.js";

const getAllCategories = async () => {
    try {
        const allCategories = await Category.find();
        return allCategories;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default { getAllCategories }