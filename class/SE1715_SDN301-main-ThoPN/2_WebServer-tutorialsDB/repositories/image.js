import Image from "../models/images.js";

const getAllImages = async () => {
  try {
    const allImage = await Image.find().exec();
    return allImage;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const createImage = async (path, url, caption) => {
  try {
    // Kiểm tra xem hình ảnh đã tồn tại hay chưa dựa trên nhiều thuộc tính khác nhau
    const existingImage = await Image.findOne({ path, url, caption }).exec();
    if (existingImage) {
      throw new Error("This image already exists");
    }

    // Tạo hình ảnh mới
    const newImage = await Image.create({ path, url, caption });
    return newImage;
  } catch (error) {
    // Ghi log lỗi và trả về một thông điệp lỗi đơn giản
    console.error("Error creating image:", error);
    throw new Error("Failed to create image");
  }
};

const getImageByPath = async (imagePath) => {
  try {
    const image = await Image.findById(imagePath).exec();
    if (!image) {
      throw new Error("This image not found");
    }
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { getAllImages, createImage, getImageByPath };
