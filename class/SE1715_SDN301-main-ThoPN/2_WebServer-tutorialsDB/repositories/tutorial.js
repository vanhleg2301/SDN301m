import Tutorial from "../models/tutorial.js";

// C: Create a new tutorial
const createTutorial = async ({
  title,
  author,
  images,
  comments,
  category,
}) => {
  try {
    // Fetch a tutorial by name
    const existingTutorial = await Tutorial.findOne({ title }).exec();
    // Check existing tutorial
    if (existingTutorial != null) throw new Error("This Tutorial existing");

    // Create tutorial
    const newTutorial = await Tutorial.create({
      title,
      author,
      images,
      comments,
      category,
    });
    // Return newtutorial created
    return newTutorial;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getAllTutorials = async () => {
  try {
    const allTutorials = await Tutorial.find().exec();
    return allTutorials;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getTutorialById = async (TutorialId) => {
  try {
    const tutorial = await Tutorial.findById(TutorialId).exec();

    if (!tutorial) {
      throw new Error("tutorial not found");
    }
    return tutorial;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const updateTutorial = async (tutorialId, updatedData) => {
  try {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      tutorialId,
      updatedData,
      { new: true, omitUndefined: true }
    ).exec();
    if (!updatedTutorial) throw new Error("Tutorial not found");
    return updatedTutorial;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteTutorialById = async (tutorialId) => {
  try {
    const deletedTutorial = await Tutorial.findByIdAndDelete(tutorialId).exec();

    if (!deletedTutorial) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    return deletedTutorial;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  createTutorial,
  getAllTutorials,
  updateTutorial,
  getTutorialById,
  deleteTutorialById,
};
