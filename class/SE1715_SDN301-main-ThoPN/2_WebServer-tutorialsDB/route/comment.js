import express from "express";
import { commentController } from "../controllers/index.js";

const commentRouter = express.Router();

commentRouter.get("/", commentController.getAllCommentsController);

export default commentRouter;
