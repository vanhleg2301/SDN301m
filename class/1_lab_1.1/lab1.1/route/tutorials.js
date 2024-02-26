import express from "express";
import tutorialsController from "../controller/tutorials.js";


const tutorialsRouter = express.Router();

tutorialsRouter.get("/", (tutorialsController.getAllTutorials))
tutorialsRouter.get("/:title", tutorialsController.getTutorialsByTitle)
tutorialsRouter.post("/",tutorialsController.addTutorial)

export default tutorialsRouter;
