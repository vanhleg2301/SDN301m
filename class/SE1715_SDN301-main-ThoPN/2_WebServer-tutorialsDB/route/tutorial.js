import express from "express";
import { tutorialController } from "../controllers/index.js";

const tutorialRouter = express.Router();

tutorialRouter.get("/", tutorialController.getAllTutorialsController);

tutorialRouter.post("/", tutorialController.createTutorial);

tutorialRouter.get("/:id", tutorialController.getTutorialById);

tutorialRouter.put("/:id", tutorialController.updateTutorialById);

tutorialRouter.delete("/:id", tutorialController.deleteTutorialById);

export default tutorialRouter;
