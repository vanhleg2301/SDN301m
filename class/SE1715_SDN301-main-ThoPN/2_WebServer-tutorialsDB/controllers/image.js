import { imageDAO } from "../repositories/index.js";

const getAllImages = async (req, res) => {
  try {
    const allImage = await imageDAO.getAllImages();
    res.status(200).json(allImage);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString(),
    });
  }
};
const createImage = async (req, res) => {
  try {
    const { path, url, caption } = req.body;
    const result = await imageDAO.createImage({
      path,
      url,
      caption,
    });
    if (result.error) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

const getImageByPath = async (req, res) => {
  try {
    const imagePath = req.params.path;
    const result = await imageDAO.getImageByPath(imagePath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
    m;
  }
};

export default { getAllImages, createImage, getImageByPath };
