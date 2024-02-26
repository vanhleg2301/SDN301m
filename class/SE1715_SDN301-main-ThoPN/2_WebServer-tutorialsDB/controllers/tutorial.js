import { tutorialDAO } from "../repositories/index.js";

const getAllTutorialsController = async (req, res) => {
  try {
    const tutorials = await tutorialDAO.getAllTutorials();
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString(),
    });
  }
};

const createTutorial = async (req, res) => {
  try {
    const { title, author, images, comments, category } = req.body;
    const result = await tutorialDAO.createTutorial({
      title,
      author,
      images,
      comments,
      category,
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

const updateTutorialById = async (req, res) => {
  try {
    const TutorialID = req.params.id;
    const updatedData = req.body;
    const result = await tutorialDAO.updateTutorial(TutorialID, updatedData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

const getTutorialById = async (req, res) => {
  try {
    const TutorialID = req.params.id;
    const result = await tutorialDAO.getTutorialById(TutorialID);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

const deleteTutorialById = async (req, res) => {
  try {
    const tutorialID = req.params.id;
    const result = await tutorialDAO.deleteTutorialById(tutorialID);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
export default {
  getAllTutorialsController,
  createTutorial,
  updateTutorialById,
  getTutorialById,
  deleteTutorialById,
};
