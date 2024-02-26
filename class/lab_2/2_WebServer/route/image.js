import express from "express";
import { imageController } from "../controllers/index.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.getAllImages);

imageRouter.post("/", imageController.createImage);

export default imageRouter;
