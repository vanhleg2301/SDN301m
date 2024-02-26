import { imagesDAO } from "../repositories/index.js";

const getAllImages = async (req, res) => {
  try {
    const result = await imagesDAO.getAllImages();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString(),
    });
  }
};

const createImage = async (req, res) => {
  try {
    const { path, url, caption } = req.body;
    const result = await imagesDAO.createImage({
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
export default { getAllImages, createImage };
