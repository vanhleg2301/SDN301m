import Image from "../models/images.js";
const getAllImages = async () => {
  try {
    const allImages = await Image.find({}).exec();

    return allImages;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const createImage = async (imageData) => {
  try {
    const { path, url, caption } = imageData;
    const existingImage = await Image.findOne({ path }).exec();

    if (existingImage) {
      return { error: "This image already exists", status: 404 };
    }

    const newImage = await Image.create({
      path,
      url,
      caption,
    });

    return newImage.toObject();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { getAllImages, createImage };
